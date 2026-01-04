'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ShoppingCart, ArrowLeft } from 'lucide-react';

export default function AddToCartPage() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [cartItem, setCartItem] = useState({
    name: 'VisionPro AI Camera',
    price: 1299,
    quantity: 1,
    image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=400',
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfirmation(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto px-4">
        {!showConfirmation ? (
          <Card className="text-center">
            <CardContent className="pt-12 pb-8">
              <div className="flex justify-center mb-6">
                <ShoppingCart className="h-16 w-16 text-primary animate-bounce" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Adding to Cart...</h2>
              <p className="text-muted-foreground">Processing your request</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <Card className="border-green-500/50 bg-green-500/5">
              <CardHeader>
                <CardTitle className="flex items-center text-green-500">
                  <CheckCircle className="h-6 w-6 mr-3" />
                  Added to Cart Successfully!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-6 mb-6">
                  <div className="w-32 h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={cartItem.image}
                      alt={cartItem.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{cartItem.name}</h3>
                    <p className="text-muted-foreground mb-4">
                      Quantity: {cartItem.quantity}
                    </p>
                    <p className="text-2xl font-bold">
                      ${(cartItem.price * cartItem.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg mb-6">
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Your item has been added to the cart. You can continue
                    shopping or proceed to checkout.
                  </p>
                </div>

                <div className="space-y-3">
                  <Link href="/cart" className="block">
                    <Button className="w-full" size="lg">
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      View Cart & Checkout
                    </Button>
                  </Link>
                  <Link href="/products" className="block">
                    <Button variant="outline" className="w-full" size="lg">
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">
                    ${cartItem.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-border pt-2">
                  <span>Subtotal</span>
                  <span>${cartItem.price.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <div className="text-center text-sm text-muted-foreground">
              <p>You can add more items or proceed to checkout at any time.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
