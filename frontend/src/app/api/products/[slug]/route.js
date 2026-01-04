import { NextResponse } from 'next/server';
import Product from '@/lib/models/Products';
import connectDB from '@/lib/db';


//find product by slug
export async function GET(request, { params }) {
    try {
        // Ensure DB connection before any DB operation
        await connectDB();

        const { slug } = params;
        const product = await Product.findOne({ slug });

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ product }, { status: 200 });
      
        
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
    }

}