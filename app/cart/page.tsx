'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector } from '@/lib/hooks';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, Minus, Plus, X, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { items, isLoading } = useAppSelector((state) => state.cart);

  const subtotal = items.reduce((total, item) => 
    total + (item.variant.pricing.price.gross.amount * item.quantity), 0
  );

  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Add some beautiful jewelry pieces to get started!</p>
          <Link href="/products">
            <Button size="lg" className="bg-[#CF00FF] hover:bg-[#B800E6] text-white">
              Shop Collection
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6 flex flex-col sm:flex-row gap-6"
              >
                <div className="w-full sm:w-32 h-32 relative overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={item.variant.product.thumbnail?.url || 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg'}
                    alt={item.variant.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.variant.product.name}
                      </h3>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500">
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                    <p className="text-gray-600 mb-4">{item.variant.name}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="icon" className="w-8 h-8">
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-12 text-center font-semibold">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="w-8 h-8">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-xl font-bold text-[#B800E6]">
                        ₹{(item.variant.pricing.price.gross.amount * item.quantity).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        ₹{item.variant.pricing.price.gross.amount.toLocaleString()} each
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6 h-fit sticky top-24"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between text-lg">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-[#B800E6]">₹{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Link href="/checkout">
                <Button size="lg" className="mb-3 w-full bg-[#CF00FF] hover:bg-[#B800E6] text-white py-4 text-lg">
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              
              <Link href="/products">
                <Button variant="outline" size="lg" className="w-full py-4 text-lg">
                  Continue Shopping
                </Button>
              </Link>
            </div>

            {/* Security Features */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Secure checkout with SSL encryption</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}