-- Migration 006: Add pgvector extension and knowledge_chunks table for RAG
-- ============================================================
-- IMPORTANT: This migration requires the pgvector extension to be
-- installed on your PostgreSQL server first.
-- Windows installation steps are in PGVECTOR_INSTALL.md
-- ============================================================

-- Enable the pgvector extension in this database
CREATE EXTENSION IF NOT EXISTS vector;

-- knowledge_chunks: stores all RAG document chunks with embeddings
-- Each row = one semantic "chunk" of knowledge from a medicine or blog article
CREATE TABLE IF NOT EXISTS knowledge_chunks (
    id          SERIAL PRIMARY KEY,

    -- The actual text that gets injected into the Gemini prompt as context
    content     TEXT NOT NULL,

    -- Type of chunk: 'medicine_overview', 'medicine_dosage', 'medicine_side_effects',
    --                'medicine_precautions', 'medicine_uses', 'blog_article'
    source_type VARCHAR(100) NOT NULL,

    -- ID of the source item (product id as string, or blog article slug)
    source_id   VARCHAR(255),

    -- Human-readable name shown to users as a citation
    -- e.g. "Paracetamol 500mg — Dosage" or "HealthMeds Blog: Diabetes Care"
    source_name VARCHAR(500),

    -- Category (product category or blog category) — for filtering if needed
    category    VARCHAR(100),

    -- Extra metadata as JSON (manufacturer, article_title, etc.)
    metadata    JSONB DEFAULT '{}',

    -- The 3072-dimensional embedding vector from Gemini gemini-embedding-001
    -- This is what pgvector searches with cosine similarity (<=>) operator
    embedding   vector(3072),

    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- NOTE: pgvector 0.8.6 IVFFlat and HNSW approximate-neighbor indexes cap at 2000 dimensions.
-- gemini-embedding-001 produces 3072-dim vectors, so ANN indexes cannot be used here.
-- At ~166 chunks, PostgreSQL exact sequential scan via <=> is extremely fast (<5ms).
-- An ANN index would only be worth adding at 10,000+ chunks.

-- Standard B-tree indexes for filtering and admin queries
CREATE INDEX IF NOT EXISTS idx_knowledge_chunks_source_type ON knowledge_chunks(source_type);
CREATE INDEX IF NOT EXISTS idx_knowledge_chunks_source_id   ON knowledge_chunks(source_id);
