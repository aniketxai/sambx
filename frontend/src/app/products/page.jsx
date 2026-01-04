'use client';

import { useState } from 'react';
import ProductCard from '@/components/product-card';
import { products } from '@/lib/mockData';
import { Button } from '@/components/ui/button';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            Our Products
          </h1>
          <p className="text-xl text-muted-foreground">
            Innovative hardware and software solutions powered by AI
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 md:py-32 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need a Custom Solution?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Don't see exactly what you're looking for? We can design and build
            custom hardware and software solutions tailored to your specific needs.
          </p>
          <Button size="lg">Contact Us for Custom Projects</Button>
        </div>
      </section>
    </div>
  );
}
