/**
 * rag/retriever.js — Semantic Retrieval Module
 * =============================================
 *
 * This is the core of the RAG pipeline's "R" (Retrieval) step.
 *
 * How it works:
 *   1. Takes the user's natural-language query
 *   2. Generates a 3072-dim embedding using Gemini gemini-embedding-001
 *      with TaskType.RETRIEVAL_QUERY (different from RETRIEVAL_DOCUMENT used at ingestion)
 *   3. Runs a pgvector cosine similarity search against knowledge_chunks
 *   4. Returns the top-K most semantically similar chunks with their metadata
 *
 * Why cosine similarity?
 *   Embeddings are high-dimensional vectors. Cosine similarity measures the
 *   ANGLE between two vectors (ignoring magnitude). Two semantically similar
 *   texts point in the same "direction" in embedding space, so cosine
 *   similarity is near 1.0. Unrelated texts point in different directions.
 *
 * Why use RETRIEVAL_QUERY for queries and RETRIEVAL_DOCUMENT for documents?
 *   Gemini gemini-embedding-001 is a "bi-encoder" model trained with task hints.
 *   Using the correct task type optimises the embedding for its intended use,
 *   improving retrieval precision.
 */

'use strict';

require('dotenv').config();
const { GoogleGenerativeAI, TaskType } = require('@google/generative-ai');
const pool = require('../db');

// ─── Configuration ────────────────────────────────────────────────────────────
// Default number of chunks to retrieve per query.
// Increasing K gives more context but uses more tokens in the Gemini prompt.
const DEFAULT_TOP_K = 4;

// Minimum similarity score to include a chunk (0 = include everything, 1 = exact match)
// 0.5 is a reasonable threshold — below this, chunks are usually noise.
const MIN_SIMILARITY = 0.35;

// ─── AI Client Setup ─────────────────────────────────────────────────────────
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const embeddingModel = genAI.getGenerativeModel({ model: 'gemini-embedding-001' });

// ─── Embed the user's query ───────────────────────────────────────────────────
/**
 * Generates an embedding for the user's query.
 * Note: TaskType.RETRIEVAL_QUERY (not RETRIEVAL_DOCUMENT) — this is intentional.
 * The model uses slightly different vector spaces for documents vs queries.
 */
async function embedQuery(queryText) {
  const result = await embeddingModel.embedContent({
    content: { parts: [{ text: queryText }], role: 'user' },
    taskType: TaskType.RETRIEVAL_QUERY,
  });
  return result.embedding.values; // 3072-dimensional float array
}

// ─── Vector similarity search ─────────────────────────────────────────────────
/**
 * Performs cosine similarity search on the knowledge_chunks table.
 *
 * The <=> operator is pgvector's cosine distance operator.
 * Cosine distance = 1 - cosine_similarity, so ORDER BY ASC gives most similar first.
 * We convert to similarity score: similarity = 1 - distance
 *
 * @param {string} queryText - The user's question
 * @param {object} options
 * @param {number} [options.topK=4] - Number of chunks to return
 * @param {string} [options.sourceType] - Optional filter by source_type
 * @returns {Array} Array of chunk objects with content, metadata, similarity
 */
async function retrieve(queryText, { topK = DEFAULT_TOP_K, sourceType = null } = {}) {
  // Step 1: Embed the query
  const queryEmbedding = await embedQuery(queryText);

  // Step 2: Format as PostgreSQL vector literal
  const vectorLiteral = `[${queryEmbedding.join(',')}]`;

  // Step 3: Cosine similarity search
  // (1 - (embedding <=> query_vector)) converts distance to similarity score
  let query = `
    SELECT
      id,
      content,
      source_type,
      source_id,
      source_name,
      category,
      metadata,
      1 - (embedding <=> $1::vector) AS similarity
    FROM knowledge_chunks
    WHERE 1 - (embedding <=> $1::vector) > $2
  `;

  const params = [vectorLiteral, MIN_SIMILARITY];

  // Optional filter by source type (e.g., only blog articles)
  if (sourceType) {
    params.push(sourceType);
    query += ` AND source_type = $${params.length}`;
  }

  query += ` ORDER BY embedding <=> $1::vector ASC LIMIT $${params.length + 1}`;
  params.push(topK);

  const result = await pool.query(query, params);

  // Step 4: Return chunks with similarity scores
  return result.rows.map((row) => ({
    id:          row.id,
    content:     row.content,
    source_type: row.source_type,
    source_id:   row.source_id,
    source_name: row.source_name,
    category:    row.category,
    metadata:    row.metadata,
    similarity:  parseFloat(row.similarity.toFixed(4)),
  }));
}

module.exports = { retrieve };
