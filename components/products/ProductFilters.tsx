'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setFilters, clearFilters } from '@/store/slices/productsSlice';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

const filterOptions = {
  color: ['white-gold', 'gold', 'silver', 'rose-gold'],
  metal: ['gold', 'silver', 'platinum'],
  carat: ['1', '2', '3', '5'],
  gender: ['male', 'female', 'unisex'],
  shape: ['round', 'oval', 'square', 'heart'],
  size: ['1', '2', '3', '4', '5'],
};

export function ProductFilters() {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.products);
  const [localFilters, setLocalFilters] = useState<Record<string, string[]>>(filters);

  const handleFilterChange = (category: string, value: string, checked: boolean) => {
    setLocalFilters(prev => {
      const categoryFilters = prev[category] || [];
      if (checked) {
        return {
          ...prev,
          [category]: [...categoryFilters, value]
        };
      } else {
        return {
          ...prev,
          [category]: categoryFilters.filter(v => v !== value)
        };
      }
    });
  };

  const applyFilters = () => {
    dispatch(setFilters(localFilters));
  };

  const clearAllFilters = () => {
    setLocalFilters({});
    dispatch(clearFilters());
  };

  const hasActiveFilters = Object.values(localFilters).some(values => values.length > 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-xl shadow-sm p-6 sticky top-24"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-[#B800E6] hover:text-[#9A00CC]"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {Object.entries(filterOptions).map(([category, options]) => (
          <div key={category}>
            <h3 className="text-sm font-medium text-gray-900 mb-3 capitalize">
              {category}
            </h3>
            <div className="space-y-2">
              {options.map((option) => {
                const isChecked = localFilters[category]?.includes(option) || false;
                return (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${category}-${option}`}
                      checked={isChecked}
                      onCheckedChange={(checked) => 
                        handleFilterChange(category, option, checked as boolean)
                      }
                      className="data-[state=checked]:bg-[#CF00FF] data-[state=checked]:border-[#CF00FF]"
                    />
                    <Label
                      htmlFor={`${category}-${option}`}
                      className="text-sm text-gray-700 capitalize cursor-pointer"
                    >
                      {option.replace('-', ' ')}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-2">
        <Button
          onClick={applyFilters}
          className="w-full bg-[#CF00FF] hover:bg-[#B800E6] text-white"
        >
          Apply Filters
        </Button>
      </div>
    </motion.div>
  );
}