'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Check, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';

// Mock products - only need name and slug
const PRODUCTS = [
  { id: 1, name: 'VisionPro AI Camera', slug: 'visionpro-ai-camera' },
  { id: 2, name: 'SmartPCB Dev Kit', slug: 'smartpcb-dev-kit' },
  { id: 3, name: 'AutoDrone X1', slug: 'autodrone-x1' },
  { id: 4, name: 'EdgeAI Processor', slug: 'edgeai-processor' },
  { id: 5, name: 'IoT Gateway Hub', slug: 'iot-gateway-hub' },
  { id: 6, name: 'Vision Inspection System', slug: 'vision-inspection-system' },
];

export default function OrderPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    extraMessage: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (params?.slug) {
      const foundProduct = PRODUCTS.find((p) => p.slug === params.slug);
      setProduct(foundProduct);
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!product) return;

    setIsLoading(true);

    try {
      const orderData = {
        productName: product.name,
        quantity,
        customerInfo: formData,
        orderDate: new Date().toISOString(),
      };

      // Save to local storage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(orderData);
      localStorage.setItem('orders', JSON.stringify(orders));

      // Send email via API
      await axios.post(`/api/orders/${product.slug}`, orderData);

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting order:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen pt-20">
      {!product ? (
        <div className="py-20 text-center">
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      ) : (
        <section className="py-12 md:py-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-2xl md:text-4xl font-bold mb-2 break-words">Order {product.name}</h1>
              <p className="text-muted-foreground text-sm md:text-base">
                Fill in your shipping details to place your order
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Shipping & Contact Details</CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-green-900">Order Submitted!</h3>
                    <p className="text-lg text-muted-foreground mb-2">
                      Your order has been received successfully.
                    </p>
                    <p className="text-green-700 font-medium">
                      We will contact you soon with more details.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    {/* Email and Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          Phone Number *
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 9876543210"
                          required
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium mb-2">
                        Street Address *
                      </label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="123 Main Street"
                        required
                      />
                    </div>

                    {/* City, State and Postal Code */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium mb-2">
                          City *
                        </label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Mumbai"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium mb-2">
                          State *
                        </label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          placeholder="Maharashtra"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium mb-2">
                          Postal Code *
                        </label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          placeholder="400001"
                          required
                        />
                      </div>
                    </div>

                    {/* Extra Message */}
                    <div>
                      <label htmlFor="extraMessage" className="block text-sm font-medium mb-2">
                        Additional Message (Optional)
                      </label>
                      <Textarea
                        id="extraMessage"
                        name="extraMessage"
                        value={formData.extraMessage}
                        onChange={handleChange}
                        placeholder="Any special requirements or questions?"
                        rows={4}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting Order...
                        </>
                      ) : (
                        'Place Order'
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Info Box */}
            <Card className="mt-6 bg-muted/50 border-muted">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">
                  💡 <strong>No payment required now.</strong> We'll contact you with pricing, delivery details, and payment options after we receive your order.
                </p>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <Link href="/products">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Products
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
