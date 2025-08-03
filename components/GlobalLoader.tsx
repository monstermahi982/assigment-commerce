"use client";

import { useAppSelector } from "@/lib/hooks";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function GlobalLoader() {
  const { loading, message } = useAppSelector((state) => state.loader);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="loading-message"
        >
          {/* Loading Card */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col items-center space-y-6 rounded-2xl bg-white p-8 shadow-2xl ring-1 ring-black/5"
          >
            {/* Modern Spinner */}
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="h-16 w-16 rounded-full border-4 border-gray-200 border-t-[#CF00FF]"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 h-12 w-12 rounded-full border-4 border-gray-100 border-b-[#B800E6]"
              />
            </div>

            {/* Loading Message */}
            <div className="text-center">
              <motion.p
                id="loading-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg font-semibold text-gray-900"
              >
                {message || "Loading..."}
              </motion.p>
            </div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Alternative Minimal Top Bar Version
export function GlobalLoaderTopBar() {
  const { loading, message } = useAppSelector((state) => state.loader);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#CF00FF] to-[#B800E6] shadow-lg"
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-center space-x-3">
              <Loader2 className="h-5 w-5 animate-spin text-white" />
              <span className="text-white font-medium text-sm">
                {message || "Loading..."}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <motion.div
            className="h-1 bg-white/30"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "left" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

