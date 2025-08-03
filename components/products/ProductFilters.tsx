import { useState } from "react";
import { X } from "lucide-react";

// Filter structure for attributes
interface FilterOption {
  slug: string;
  name: string;
  values: Array<{
    slug: string;
    name: string;
  }>;
}

interface ProductFiltersProps {
  onFiltersChange: (filters: Record<string, string[]>) => void;
  initialFilters?: Record<string, string[]>;
}

const filterOptions: FilterOption[] = [
  {
    slug: "shape",
    name: "Shape",
    values: [
      { slug: "round", name: "Round" },
      { slug: "oval", name: "Oval" },
      { slug: "square", name: "Square" },
      { slug: "heart", name: "Heart" },
      { slug: "emerald", name: "Emerald" },
      { slug: "princess", name: "Princess" },
    ],
  },
  {
    slug: "size",
    name: "Size",
    values: [
      { slug: "1", name: "1 Carat" },
      { slug: "2", name: "2 Carat" },
      { slug: "3", name: "3 Carat" },
      { slug: "4", name: "4 Carat" },
      { slug: "5", name: "5 Carat" },
    ],
  },
  {
    slug: "gender",
    name: "Gender",
    values: [
      { slug: "male", name: "Male" },
      { slug: "female", name: "Female" },
      { slug: "unisex", name: "Unisex" },
    ],
  },
  {
    slug: "color",
    name: "Color",
    values: [
      { slug: "white-gold", name: "White Gold" },
      { slug: "yellow-gold", name: "Yellow Gold" },
      { slug: "rose-gold", name: "Rose Gold" },
      { slug: "platinum", name: "Platinum" },
      { slug: "silver", name: "Silver" },
    ],
  },
  {
    slug: "metal",
    name: "Metal Type",
    values: [
      { slug: "gold", name: "Gold" },
      { slug: "silver", name: "Silver" },
      { slug: "platinum", name: "Platinum" },
      { slug: "titanium", name: "Titanium" },
      { slug: "palladium", name: "Palladium" },
    ],
  },
];

export default function ProductFilters({
  onFiltersChange,
  initialFilters,
}: ProductFiltersProps) {
  const [localFilters, setLocalFilters] = useState<Record<string, string[]>>(
    initialFilters || {}
  );

  const handleAttributeChange = (
    attributeSlug: string,
    valueSlug: string,
    checked: boolean
  ) => {
    setLocalFilters((prev) => {
      const newFilters = { ...prev };

      if (checked) {
        // Add value to attribute
        if (!newFilters[attributeSlug]) {
          newFilters[attributeSlug] = [];
        }
        if (!newFilters[attributeSlug].includes(valueSlug)) {
          newFilters[attributeSlug] = [...newFilters[attributeSlug], valueSlug];
        }
      } else {
        // Remove value from attribute
        if (newFilters[attributeSlug]) {
          newFilters[attributeSlug] = newFilters[attributeSlug].filter(
            (v) => v !== valueSlug
          );
          // Remove attribute if no values left
          if (newFilters[attributeSlug].length === 0) {
            delete newFilters[attributeSlug];
          }
        }
      }

      return newFilters;
    });
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters: Record<string, string[]> = {};
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const isAttributeValueChecked = (
    attributeSlug: string,
    valueSlug: string
  ) => {
    return localFilters[attributeSlug]?.includes(valueSlug) || false;
  };

  const hasActiveFilters = Object.keys(localFilters).length > 0;

  const getActiveFiltersCount = () => {
    return Object.values(localFilters).reduce(
      (count, values) => count + values.length,
      0
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24 max-h-[80vh] overflow-y-auto transform transition-all duration-300 hover:shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          {getActiveFiltersCount() > 0 && (
            <span className="text-sm text-purple-600 font-medium">
              {getActiveFiltersCount()} active
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center px-3 py-1 text-sm text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-md transition-colors"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Attribute Filters */}
        {filterOptions.map((filterOption) => {
          const activeCount = localFilters[filterOption.slug]?.length || 0;

          return (
            <div key={filterOption.slug} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">
                  {filterOption.name}
                </h3>
                {activeCount > 0 && (
                  <span className="px-2 py-1 text-xs bg-purple-600 text-white rounded-full">
                    {activeCount}
                  </span>
                )}
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {filterOption.values.map((value) => {
                  const isChecked = isAttributeValueChecked(
                    filterOption.slug,
                    value.slug
                  );
                  return (
                    <div
                      key={value.slug}
                      className="flex items-center space-x-2"
                    >
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) =>
                            handleAttributeChange(
                              filterOption.slug,
                              value.slug,
                              e.target.checked
                            )
                          }
                          className="sr-only peer"
                        />
                        <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded peer-checked:bg-purple-600 peer-checked:border-purple-600 transition-all duration-200 flex items-center justify-center">
                          {isChecked && (
                            <svg
                              className="w-2.5 h-2.5 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                      </label>
                      <span className="text-sm text-gray-700 hover:text-gray-900 transition-colors cursor-pointer">
                        {value.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Apply Button */}
      <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
        <button
          onClick={applyFilters}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
        >
          Apply Filters
          {getActiveFiltersCount() > 0 && (
            <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
              {getActiveFiltersCount()}
            </span>
          )}
        </button>

        {/* Selected Filters Preview */}
        {Object.keys(localFilters).length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-gray-500 font-medium">Selected:</p>
            <div className="flex flex-wrap gap-1">
              {Object.entries(localFilters).map(([attrSlug, values]) =>
                values.map((value) => (
                  <span
                    key={`${attrSlug}-${value}`}
                    className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-md border border-purple-200"
                  >
                    {filterOptions.find((opt) => opt.slug === attrSlug)?.name}:{" "}
                    {
                      filterOptions
                        .find((opt) => opt.slug === attrSlug)
                        ?.values.find((val) => val.slug === value)?.name
                    }
                  </span>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
