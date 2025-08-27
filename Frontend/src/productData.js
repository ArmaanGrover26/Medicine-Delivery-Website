// src/productData.js
// This is our new central file for all product information.

export const products = [
  // First 6 products for the homepage
  { id: 1, name: 'Paracetamol 500mg', manufacturer: 'Cipla Ltd', price: 45, originalPrice: 60, discount: 25, rating: 4.5, reviews: 534, category: 'Pain Relief', status: 'In Stock', rxRequired: false },
  { id: 2, name: 'Cough Syrup 100ml', manufacturer: 'Dabur India Ltd', price: 85, originalPrice: 110, discount: 23, rating: 4.3, reviews: 267, category: 'Cold & Flu', status: 'Low Stock', rxRequired: true },
  { id: 3, name: 'Cetirizine 10mg', manufacturer: "Dr. Reddy's", price: 38, originalPrice: 50, discount: 24, rating: 4.4, reviews: 189, category: 'Allergy Relief', status: 'In Stock', rxRequired: false },
  { id: 4, name: 'Vitamin C Tablets', manufacturer: 'Himalaya', price: 120, originalPrice: 150, discount: 20, rating: 4.6, reviews: 789, category: 'Supplements', status: 'In Stock', rxRequired: false },
  { id: 5, name: 'Omega-3 Fish Oil', manufacturer: 'HealthKart', price: 450, originalPrice: 600, discount: 25, rating: 4.7, reviews: 1024, category: 'Supplements', status: 'In Stock', rxRequired: false },
  { id: 6, name: 'Digital Thermometer', manufacturer: 'Omron', price: 250, originalPrice: 300, discount: 17, rating: 4.8, reviews: 945, category: 'Health Devices', status: 'In Stock', rxRequired: false },

  // Additional products for the "All Products" page
  { id: 7, name: 'Band-Aid Pack (100 pcs)', manufacturer: 'Johnson & Johnson', price: 90, originalPrice: 110, discount: 18, rating: 4.5, reviews: 432, category: 'First Aid', status: 'In Stock', rxRequired: false },
  { id: 8, name: 'Moisturizing Cream', manufacturer: 'Cetaphil', price: 350, originalPrice: 400, discount: 13, rating: 4.9, reviews: 2345, category: 'Skin Care', status: 'In Stock', rxRequired: false },
  { id: 9, name: 'Antiseptic Liquid 250ml', manufacturer: 'Dettol', price: 150, originalPrice: 165, discount: 9, rating: 4.7, reviews: 876, category: 'First Aid', status: 'In Stock', rxRequired: false },
  { id: 10, name: 'Glucose Monitor', manufacturer: 'Accu-Chek', price: 900, originalPrice: 1200, discount: 25, rating: 4.8, reviews: 1500, category: 'Health Devices', status: 'Low Stock', rxRequired: true },
  { id: 11, name: 'Herbal Toothpaste', manufacturer: 'Patanjali', price: 70, originalPrice: 80, discount: 13, rating: 4.3, reviews: 1100, category: 'Dental Care', status: 'In Stock', rxRequired: false },
  { id: 12, name: 'Protein Powder 1kg', manufacturer: 'Optimum Nutrition', price: 4500, originalPrice: 6000, discount: 25, rating: 4.9, reviews: 5600, category: 'Supplements', status: 'In Stock', rxRequired: false },
  { id: 13, name: 'Hand Sanitizer 500ml', manufacturer: 'Lifebuoy', price: 200, originalPrice: 250, discount: 20, rating: 4.6, reviews: 980, category: 'Personal Care', status: 'In Stock', rxRequired: false },
  { id: 14, name: 'Sunscreen SPF 50', manufacturer: 'Neutrogena', price: 550, originalPrice: 650, discount: 15, rating: 4.7, reviews: 1300, category: 'Skin Care', status: 'In Stock', rxRequired: false },
  { id: 15, name: 'Ayurvedic Hair Oil', manufacturer: 'Indulekha', price: 380, originalPrice: 432, discount: 12, rating: 4.5, reviews: 890, category: 'Personal Care', status: 'In Stock', rxRequired: false },
  { id: 16, name: 'Green Tea (100 Bags)', manufacturer: 'Lipton', price: 450, originalPrice: 500, discount: 10, rating: 4.4, reviews: 760, category: 'Supplements', status: 'In Stock', rxRequired: false },
  { id: 17, name: 'Blood Pressure Monitor', manufacturer: 'Dr. Morepen', price: 1500, originalPrice: 2000, discount: 25, rating: 4.8, reviews: 2100, category: 'Health Devices', status: 'In Stock', rxRequired: true },
  { id: 18, name: 'Multivitamin for Men', manufacturer: 'MuscleBlaze', price: 700, originalPrice: 850, discount: 18, rating: 4.6, reviews: 1400, category: 'Supplements', status: 'In Stock', rxRequired: false },
];