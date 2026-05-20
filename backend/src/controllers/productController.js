import mongoose from 'mongoose';

import { Product } from '../models/Product.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {
  categories as defaultCategories,
  faqs,
  products as fallbackProducts,
  services,
  testimonials,
} from '../data/initialData.js';

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function isDatabaseReady() {
  return mongoose.connection.readyState === 1;
}

function sortProducts(products, sort = 'featured') {
  const list = [...products];

  switch (sort) {
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return list.sort((a, b) => b.price - a.price);
    case 'rating':
      return list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case 'newest':
      return list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    case 'featured':
    default:
      return list.sort(
        (a, b) => (b.rating || 0) - (a.rating || 0) || (b.reviews || 0) - (a.reviews || 0)
      );
  }
}

function filterFallbackProducts({ category, q, sort }) {
  const search = q ? new RegExp(escapeRegex(q), 'i') : null;

  const filtered = fallbackProducts.filter((product) => {
    const matchesCategory = !category || category === 'All' || product.category === category;
    const matchesQuery =
      !search ||
      search.test(product.name) ||
      search.test(product.category) ||
      search.test(product.description);

    return matchesCategory && matchesQuery;
  });

  return sortProducts(filtered, sort);
}

async function loadProducts({ category, q, sort }) {
  if (!isDatabaseReady()) {
    return filterFallbackProducts({ category, q, sort });
  }

  const filter = {};

  if (category && category !== 'All') {
    filter.category = category;
  }

  if (q) {
    filter.$or = [
      { name: { $regex: q, $options: 'i' } },
      { category: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
    ];
  }

  const sortMap = {
    featured: { rating: -1, reviews: -1 },
    'price-asc': { price: 1 },
    'price-desc': { price: -1 },
    rating: { rating: -1 },
    newest: { createdAt: -1 },
  };

  try {
    return await Product.find(filter).sort(sortMap[sort] || sortMap.featured).lean();
  } catch (error) {
    console.error('Product query failed, falling back to static data:', error);
    return filterFallbackProducts({ category, q, sort });
  }
}

export const getProducts = asyncHandler(async (req, res) => {
  const { category, q, sort } = req.query;

  const products = await loadProducts({ category, q, sort });
  res.json({ success: true, count: products.length, data: products });
});

export const getProductById = asyncHandler(async (req, res) => {
  let product = null;

  if (isDatabaseReady()) {
    try {
      product = await Product.findOne({ id: req.params.id }).lean();
    } catch (error) {
      console.error('Product lookup failed, falling back to static data:', error);
    }
  }

  if (!product) {
    product = fallbackProducts.find((item) => item.id === req.params.id) || null;
  }

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json({ success: true, data: product });
});

export const getCategories = asyncHandler(async (req, res) => {
  let categories = [];

  if (isDatabaseReady()) {
    try {
      categories = await Product.distinct('category');
    } catch (error) {
      console.error('Category lookup failed, falling back to static data:', error);
    }
  }

  res.json({ success: true, data: categories.length ? categories : defaultCategories });
});

export const getHomeData = asyncHandler(async (req, res) => {
  let featuredProducts = [];
  let categories = [];

  if (isDatabaseReady()) {
    try {
      [featuredProducts, categories] = await Promise.all([
        Product.find().sort({ rating: -1, reviews: -1 }).limit(4).lean(),
        Product.distinct('category'),
      ]);
    } catch (error) {
      console.error('Home data lookup failed, falling back to static data:', error);
    }
  }

  if (!featuredProducts.length) {
    featuredProducts = sortProducts(fallbackProducts).slice(0, 4);
  }

  res.json({
    success: true,
    data: {
      featuredProducts,
      services,
      testimonials,
      faqs,
      categories: categories.length ? categories : defaultCategories,
    },
  });
});
