"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector, useInfiniteScroll } from "@/lib/hooks";
import { fetchProducts, setFilters } from "@/store/slices/productsSlice";
import { ProductCard } from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import { Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const { products, isLoading, error, filters, hasMore, endCursor } =
    useAppSelector((state) => state.products);

  const handleFiltersChange = (data: Record<string, string[]>) => {
    dispatch(fetchProducts({ filters: data }));
  };

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      const searchQuery = searchParams.get("search");
      if (searchQuery) {
        dispatch(
          fetchProducts({
            search: searchQuery,
            after: endCursor || undefined,
            append: true,
          })
        );
      } else {
        dispatch(
          fetchProducts({
            filters,
            after: endCursor || undefined,
            append: true,
          })
        );
      }
    }
  }, [dispatch, isLoading, hasMore, endCursor, searchParams, filters]);

  const lastElementRef = useInfiniteScroll(hasMore, isLoading, loadMore);

  useEffect(() => {
    // Check for search parameter in URL
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      dispatch(fetchProducts({ search: searchQuery }));
    } else {
      dispatch(fetchProducts({ filters }));
    }
  }, [dispatch, filters, searchParams]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {searchParams.get("search")
                ? `Search Results for "${searchParams.get("search")}"`
                : "Our Collection"}
            </h1>
            <p className="text-gray-600">
              {searchParams.get("search")
                ? `Found ${
                    products.length
                  } products matching "${searchParams.get("search")}"`
                : `Discover ${products.length} exquisite pieces crafted for you`}
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            {/* View Mode Toggle */}
            <div className="flex rounded-lg border border-gray-200 bg-white">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-[#CF00FF] text-white" : ""}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-[#CF00FF] text-white" : ""}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </Button>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.aside
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                className="lg:w-80"
              >
                <ProductFilters onFiltersChange={handleFiltersChange} />
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl h-96 animate-pulse"
                  />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 text-lg">{error}</p>
              </div>
            ) : (
              <motion.div
                layout
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
              >
                <AnimatePresence>
                  {products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      ref={
                        index === products.length - 1
                          ? lastElementRef
                          : undefined
                      }
                    >
                      <ProductCard product={product} viewMode={viewMode} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {!isLoading && products.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <p className="text-gray-600 text-lg">
                  No products found matching your criteria.
                </p>
                <Button
                  onClick={() => dispatch(setFilters({}))}
                  variant="outline"
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}

            {/* Loading more indicator */}
            {isLoading && products.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center py-8"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 border-2 border-[#CF00FF] border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-gray-600">
                    Loading more products...
                  </span>
                </div>
              </motion.div>
            )}

            {/* End of results indicator */}
            {!isLoading && !hasMore && products.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <p className="text-gray-500 text-sm">
                  You&apos;ve reached the end of the results
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
