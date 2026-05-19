import mongoose from 'mongoose';

const specificationSchema = new mongoose.Schema({}, { _id: false, strict: false });

const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true, index: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, default: null },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    description: { type: String, required: true },
    features: [{ type: String }],
    specifications: { type: specificationSchema, default: {} },
    images: [{ type: String }],
    badge: { type: String, default: null },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product', productSchema);
