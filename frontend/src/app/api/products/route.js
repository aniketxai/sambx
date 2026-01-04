
import { NextResponse } from 'next/server';
import Product from '@/lib/models/Products';
import connectDB from '@/lib/db';







// GET /api/products

export async function GET(request) {
    try {
        // Ensure DB connection before any DB operation
        await connectDB();

        const products = await Product.find().sort({ createdAt: -1 });

        return NextResponse.json({ products }, { status: 200 });
      
        
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }

}

// POST /api/products

export async function POST(request) {
  try {
    // Ensure DB connection before any DB operation
    await connectDB();

    const data = await request.json();

    // Basic validation
    if (!data.name || !data.slug || !data.price || !data.category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check for existing product by slug
    const existingProduct = await Product.findOne({ slug: data.slug });
    if (existingProduct) {
      return NextResponse.json(
        { error: 'Product with this slug already exists' },
        { status: 409 }
      );
    }

    const product = await Product.create(data);

    return NextResponse.json(
      {
        message: 'Product created successfully',
        product
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Product creation error:', error);

    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 },
      { cause: error }
    );
  }
}
