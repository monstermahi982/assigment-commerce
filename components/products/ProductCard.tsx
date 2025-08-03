'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/lib/hooks';
import { createCheckout } from '@/store/slices/cartSlice';

interface Product {
  id: string;
  name: string;
  slug: string;
  description?: React.ReactNode;
  defaultVariant?: {
    id: string;
    name: string;
    sku: string;
    pricing: {
      price: {
        gross: {
          amount: number;
          currency: string;
        };
      };
    };
  };
  media: Array<{
    id: string;
    url: string;
    alt: string;
    type: string;
  }>;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  isAvailableForPurchase: boolean;
}

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
}

export function ProductCard({ product, viewMode }: ProductCardProps) {
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.defaultVariant) {
      dispatch(createCheckout({
        variantId: product.defaultVariant.id,
        quantity: 1,
        email: 'user@example.com',
      }));
    }
  };

  const imageUrl = product?.media?.length > 0 
    ? product.media[0].url 
    : 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg';

  if (viewMode === 'list') {
    return (
      <Link href={`/products/${product.slug}`}>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col sm:flex-row gap-6 group"
        >
          <div className="w-full sm:w-48 h-48 relative overflow-hidden rounded-lg">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#B800E6] transition-colors">
                  {product.name}
                </h3>
              </div>
              
              {product.category && (
                <p className="text-sm text-gray-500 mb-2">{product.category.name}</p>
              )}
              
              <p className="text-gray-600 line-clamp-3 mb-4">{product.description}</p>
              
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                    <Star className="w-4 h-4 fill-[#d0d61f] text-[#d0d61f]" />
                </div>
                <span className="text-sm text-gray-500">(4.8)</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                {product.defaultVariant && (
                  <p className="text-2xl font-bold text-[#2825e0]">
                    ₹{product.defaultVariant?.pricing?.price?.gross?.amount.toLocaleString()}
                  </p>
                )}
              </div>
              
              <Button
                onClick={handleAddToCart}
                className="bg-[#CF00FF] hover:bg-[#B800E6] text-white"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  return (
    <Link href={`/products/${product.slug}`}>
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
      >
        {/* Product Image */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
            <Button
              variant="secondary"
              onClick={handleAddToCart}
              className="bg-white/90 hover:bg-white"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>

          {/* Category Badge */}
          {product.category && (
            <div className="absolute top-4 left-4">
              <span className="bg-[#CF00FF] text-white text-xs px-2 py-1 rounded-full font-medium">
                {product.category.name}
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#B800E6] transition-colors line-clamp-2">
            {product.name}
          </h3>
          
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center">
                <Star className="w-4 h-4 fill-[#d4bc1d] text-[#d4bc1d]" />
            </div>
            <span className="text-sm text-gray-500">(4.8)</span>
          </div>

          <div className="flex items-center justify-between">
            {product.defaultVariant && (
              <p className="text-xl font-bold text-[#0051e6]">
                ₹{product.defaultVariant?.pricing?.price?.gross?.amount.toLocaleString()}
              </p>
            )}
            
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-500">In Stock</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}