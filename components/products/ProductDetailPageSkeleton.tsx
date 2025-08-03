"use client";

export function ProductDetailPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
          {/* Product Images Skeleton */}
          <div className="space-y-4">
            {/* Main Image Skeleton */}
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-200 shadow-sm"></div>

            {/* Thumbnail Gallery Skeleton */}
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-lg bg-gray-200"
                ></div>
              ))}
            </div>
          </div>

          {/* Product Details Skeleton */}
          <div className="space-y-6">
            {/* Category Badge Skeleton */}
            <div className="h-6 bg-gray-200 rounded-full w-20"></div>

            {/* Product Title Skeleton */}
            <div className="space-y-2">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>

            {/* Rating Skeleton */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-5 bg-gray-200 rounded"></div>
                ))}
              </div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-2"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>

            {/* Price Skeleton */}
            <div className="flex items-center space-x-2">
              <div className="h-10 bg-gray-200 rounded w-32"></div>
              <div className="h-6 bg-gray-200 rounded w-12"></div>
            </div>

            {/* Variants Skeleton */}
            <div>
              <div className="h-6 bg-gray-200 rounded w-20 mb-4"></div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="h-10 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>

            {/* Quantity Skeleton */}
            <div>
              <div className="h-6 bg-gray-200 rounded w-20 mb-4"></div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <div className="w-10 h-10 bg-gray-200 rounded-l-lg"></div>
                  <div className="px-4 py-2">
                    <div className="h-6 bg-gray-200 rounded w-6"></div>
                  </div>
                  <div className="w-10 h-10 bg-gray-200 rounded-r-lg"></div>
                </div>
              </div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 h-14 bg-gray-200 rounded"></div>
            </div>

            {/* Features Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details Tabs Skeleton */}
        <div className="mt-16 animate-pulse">
          {/* Tabs Header Skeleton */}
          <div className="grid w-full grid-cols-2 bg-gray-100 rounded-lg p-1">
            <div className="h-10 bg-gray-200 rounded mx-1"></div>
            <div className="h-10 bg-gray-200 rounded mx-1"></div>
          </div>

          {/* Tab Content Skeleton */}
          <div className="mt-6">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
