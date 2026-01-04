'use client';

import { useState } from 'react';
import BlogCard from '@/components/blog-card';
import { blogPosts } from '@/lib/mockData';
import { Button } from '@/components/ui/button';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    ...new Set(blogPosts.map((post) => post.category)),
  ];

  const filteredPosts =
    selectedCategory === 'All'
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            Tech Insights & Updates
          </h1>
          <p className="text-xl text-muted-foreground">
            Deep dives into AI, computer vision, hardware engineering, and more
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No posts found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 md:py-32 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay Updated
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Get the latest insights on AI, hardware engineering, and technology
            innovation delivered straight to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            <Button className="sm:w-auto">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
