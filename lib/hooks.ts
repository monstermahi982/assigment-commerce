import { useDispatch, useSelector, useStore } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '@/store/store';
import { useCallback, useEffect, useRef } from 'react';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = useStore;

// Custom hook for infinite scrolling
export const useInfiniteScroll = (
  hasMore: boolean,
  isLoading: boolean,
  onLoadMore: () => void,
  threshold = 100
) => {
  const observerRef = useRef<IntersectionObserver>();
  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return;
      
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            onLoadMore();
          }
        },
        {
          rootMargin: `${threshold}px`,
        }
      );
      
      if (node) {
        observerRef.current.observe(node);
      }
    },
    [isLoading, hasMore, onLoadMore, threshold]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return lastElementRef;
};