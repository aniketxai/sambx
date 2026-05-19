import { Product } from '../models/Product.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { categories as defaultCategories, services, testimonials, faqs } from '../data/initialData.js';

export const getProducts = asyncHandler(async (req, res) => {
  const { category, q, sort } = req.query;

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

  const products = await Product.find(filter).sort(sortMap[sort] || sortMap.featured).lean();
  res.json({ success: true, count: products.length, data: products });
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ id: req.params.id }).lean();
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json({ success: true, data: product });
});

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Product.distinct('category');
  res.json({ success: true, data: categories.length ? categories : defaultCategories });
});

export const getHomeData = asyncHandler(async (req, res) => {
  const [featuredProducts, categories] = await Promise.all([
    Product.find().sort({ rating: -1, reviews: -1 }).limit(4).lean(),
    Product.distinct('category'),
  ]);

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
