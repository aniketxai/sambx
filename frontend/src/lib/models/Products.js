import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    description: {
      type: String,
      required: true
    },
    longDescription: {
      type: String
    },
    price: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['Available', 'In Development', 'Out of Stock'],
      default: 'Available'
    },
    category: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    images: [
      {
        type: String
      }
    ],
    features: [
      {
        type: String
      }
    ],
    techStack: [
      {
        type: String
      }
    ],
    useCases: [
      {
        type: String
      }
    ]
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
