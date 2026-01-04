'use client';

import { useState ,useEffect} from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Heart, Share2, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '@/components/product-card';

export default function ProductDetailPage() {
  const params = useParams();
  const [products, setProducts] = useState([]);

  //api get slug product
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(`/api/products/${params.slug}`);
        setProducts([response.data.product]);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);
  
  

   const product = products[0];
  const [quantity, setQuantity] = useState(1);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The product you're looking for doesn't exist.
          </p>
          <Link href="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const statusColors = {
    Available: 'bg-green-500/10 text-green-500 border-green-500/20',
    'In Development': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    Prototype: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  };

  const images = product.images || [product.image];
  const suggestedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    window.location.href = '/order/' + product.slug;
  };

  const handleBuyNow = () => {
    window.location.href = '/order/' + product.slug;
  };

  const handlePrevImage = () => {
    setMainImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setMainImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden bg-muted relative">
                  <img
                    src={images[mainImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge
                    className={`absolute top-4 right-4 ${
                      statusColors[product.status]
                    }`}
                  >
                    {product.status}
                  </Badge>

                  {images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>

                {images.length > 1 && (
                  <div className="flex gap-3 mt-4 overflow-x-auto">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setMainImageIndex(idx)}
                        className={`h-20 w-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                          idx === mainImageIndex
                            ? 'border-primary'
                            : 'border-border hover:border-muted-foreground'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`View ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Badge variant="outline" className="mb-4">
                  {product.category}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {product.name}
                </h1>
                <p className="text-xl text-muted-foreground">
                  {product.description}
                </p>
              </div>

              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-bold">₹{product.price}</span>
                <span className="text-muted-foreground">INR</span>
              </div>

              <Separator />

              <div>
                <label className="block text-sm font-medium mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </Button>
                    <span className="px-4 py-2 min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                  <span className="text-muted-foreground text-sm">
                    In Stock
                  </span>
                </div>
              </div>

              <div className="flex flex-row gap-2 md:gap-4">
                <Button
                  size="sm"
                  className="flex-1 md:size-lg"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-1 md:mr-2 h-4 md:h-5 w-4 md:w-5" />
                  <span className="hidden sm:inline">Add to Cart</span>
                  <span className="sm:hidden">Add</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 md:size-lg"
                  onClick={handleBuyNow}
                >
                  <span className="hidden sm:inline">Buy Now</span>
                  <span className="sm:hidden">Buy</span>
                </Button>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>Free shipping on orders over ₹25,000</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>30-day return policy</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>1-year warranty included</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>Technical support available</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Product Details</h2>
              <p className="text-muted-foreground mb-8">
                {product.longDescription}
              </p>

              <h3 className="text-xl font-bold mb-4">Key Features</h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-primary mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {product.techStack.map((tech, index) => (
                    <Badge key={index} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Use Cases</h3>
                <ul className="space-y-3">
                  {product.useCases.map((useCase, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-primary mt-0.5 flex-shrink-0" />
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-bold mb-4">Need Help?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Have questions about this product? Our team is here to help
                    you make the right choice.
                  </p>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full">
                      Contact for Demo
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Related Products
            </h2>
            <p className="text-muted-foreground">
              You might also be interested in these products
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {suggestedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need a Custom Solution?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            We can customize this product or develop entirely new solutions
            tailored to your specific requirements.
          </p>
          <Link href="/contact">
            <Button size="lg">Request Custom Quote</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
