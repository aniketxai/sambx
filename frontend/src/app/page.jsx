'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/product-card';
// import { products } from '@/lib/mockData';
import { ArrowRight, Eye, Zap,Cpu,CircuitBoard, LayoutDashboard, } from 'lucide-react';
import axios from 'axios';

export default function Home() {

  const [products, setProducts] = useState([]);
  const featuredProducts = products.slice(0, 4);

  // Fetch products from the API
  useState(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);


const features = [
  {
    icon: Cpu,
    title: "IoT, Embedded & PCB Systems",
    description:
      "Smart connected hardware from prototype to production — sensors, microcontrollers, and custom PCBs.",
  },
  {
    icon: LayoutDashboard,
    title: "Web Development & Automation",
    description:
      "Modern websites, dashboards, and automation systems built for performance and scalability.",
  },
  {
    icon: Eye,
    title: "AI & Computer Vision",
    description:
      "Real-time vision systems for detection, tracking, and intelligent analysis.",
  },
];


  return (
    <div className="min-h-screen">

      {/* HERO */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted -z-10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5 -z-10" />

        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
            <span className="text-gradient">SAMBX</span>
          </h1>

          <p className="text-xl md:text-2xl font-semibold mb-3">
            Built to Innovate
          </p>

          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Smart AI Machines Built for eXploration
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="group">
                View Products
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Work With Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              What We Do
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              AI × Hardware × Innovation — Engineering real-world solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-xl bg-card border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-3">
                Featured Products
              </h2>
              <p className="text-muted-foreground text-lg">
               From Prototype to Product
              </p>
            </div>

            <Link href="/products" className="hidden md:block">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/products">
              <Button variant="outline" className="w-full sm:w-auto">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Need a Custom Solution?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            From idea to engineered reality.
          </p>
          <Link href="/contact">
            <Button size="lg" className="group">
             Contact Us for Custom Projects
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
