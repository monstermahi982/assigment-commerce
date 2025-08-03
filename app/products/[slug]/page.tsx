'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchProductBySlug } from '@/store/slices/productsSlice';
import { createCheckout } from '@/store/slices/cartSlice';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, ShoppingBag, Star, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react';
import { ProductDetailPageSkeleton } from '@/components/products/ProductDetailPageSkeleton';

export default function ProductDetailPage() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { currentProduct, isLoading, error } = useAppSelector((state) => state.products);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (params.slug) {
      dispatch(fetchProductBySlug({ slug: params.slug as string }));
    }
  }, [dispatch, params.slug]);

  useEffect(() => {
    if (currentProduct?.defaultVariant) {
      setSelectedVariant(currentProduct.defaultVariant.id);
    }
  }, [currentProduct]);

  const handleAddToCart = () => {
    if (selectedVariant) {
      dispatch(createCheckout({
        variantId: selectedVariant,
        quantity,
        email: 'user@example.com',
      }));
    }
  };

  if (isLoading) {
    return (
      <ProductDetailPageSkeleton />
    );
  }

  if (error || !currentProduct) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600 text-lg">{error || 'Product not found'}</p>
      </div>
    );
  }

  const imageUrl = currentProduct?.media?.length > 0 
    ? currentProduct.media[selectedImageIndex].url 
    : 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg';

  const selectedVariantData = currentProduct?.variants?.find(v => v.id === selectedVariant) || currentProduct.defaultVariant;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div
              layoutId="product-image"
              className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              <Image
                src={imageUrl}
                alt={currentProduct.name}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            
            {/* Thumbnail Gallery */}
            {currentProduct?.media?.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {currentProduct?.media.slice(0, 4).map((media, index) => (
                  <motion.button
                    key={media.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square overflow-hidden rounded-lg ${
                      selectedImageIndex === index 
                        ? 'ring-2 ring-[#CF00FF]' 
                        : 'ring-1 ring-gray-200'
                    }`}
                  >
                    <Image
                      src={media.url}
                      alt={`${currentProduct.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {currentProduct.category && (
                <Badge variant="secondary" className="mb-4">
                  {currentProduct.category.name}
                </Badge>
              )}
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {currentProduct.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#E033FF] text-[#E033FF]" />
                  ))}
                </div>
                <span className="text-gray-600">(4.8 stars)</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">127 reviews</span>
              </div>

              {selectedVariantData && (
                <div className="text-3xl font-bold text-[#B800E6] mb-6">
                  ₹{selectedVariantData.pricing.price.gross.amount.toLocaleString()}
                  <span className="text-base font-normal text-gray-500 ml-2">
                    {selectedVariantData.pricing.price.gross.currency}
                  </span>
                </div>
              )}
            </motion.div>

            {/* Variants */}
            {currentProduct?.variants?.length > 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Variants</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {currentProduct?.variants?.map((variant) => (
                    <Button
                      key={variant.id}
                      variant={selectedVariant === variant.id ? "default" : "outline"}
                      onClick={() => setSelectedVariant(variant.id)}
                      className={`text-sm ${
                        selectedVariant === variant.id 
                          ? 'bg-[#CF00FF] text-white' 
                          : 'hover:border-[#E866FF]'
                      }`}
                    >
                      {variant.name}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Quantity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 text-lg font-semibold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="flex-1 bg-[#CF00FF] hover:bg-[#B800E6] text-white py-4 text-lg"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200"
            >
              {[
                { icon: Truck, text: 'Free Shipping' },
                { icon: Shield, text: 'Lifetime Warranty' },
                { icon: RotateCcw, text: '30-Day Returns' },
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 text-gray-600">
                  <feature.icon className="w-5 h-5 text-[#CF00FF]" />
                  <span className="text-sm">{feature.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16"
        >
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {currentProduct.description?.blocks || 'This exquisite piece represents the perfect blend of craftsmanship and elegance. Each detail has been meticulously designed to create a timeless piece that will be treasured for generations.'}
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentProduct.attributes.map((attr) => (
                    <div key={attr.attribute.id} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-900">{attr.attribute.name}:</span>
                      <span className="text-gray-600">
                        {attr.values.map(v => v.name).join(', ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}