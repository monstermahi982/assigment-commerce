"use client";

interface ProductCardSkeletonProps {
  viewMode: "grid" | "list";
}

export function ProductCardSkeleton({ viewMode }: ProductCardSkeletonProps) {
  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col sm:flex-row gap-6 animate-pulse">
        {/* Image Skeleton */}
        <div className="w-full sm:w-48 h-48 bg-gray-200 rounded-lg"></div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            {/* Title Skeleton */}
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>

            {/* Category Skeleton */}
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>

            {/* Description Skeleton */}
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>

            {/* Rating Skeleton */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-12"></div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {/* Price Skeleton */}
            <div className="h-8 bg-gray-200 rounded w-24"></div>

            {/* Button Skeleton */}
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="relative h-64 bg-gray-200">
        {/* Category Badge Skeleton */}
        <div className="absolute top-4 left-4">
          <div className="h-6 bg-gray-300 rounded-full w-16"></div>
        </div>
      </div>

      {/* Product Info Skeleton */}
      <div className="p-6">
        {/* Title Skeleton */}
        <div className="h-6 bg-gray-200 rounded w-5/6 mb-2"></div>

        {/* Rating Skeleton */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-12"></div>
        </div>

        <div className="flex items-center justify-between">
          {/* Price Skeleton */}
          <div className="h-6 bg-gray-200 rounded w-20"></div>

          {/* Stock Status Skeleton */}
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
