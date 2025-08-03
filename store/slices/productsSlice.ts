import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface ProductVariant {
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
  attributes: Array<{
    attribute: {
      id: string;
      name: string;
    };
    values: Array<{
      id: string;
      name: string;
    }>;
  }>;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  defaultVariant?: ProductVariant;
  variants: ProductVariant[];
  media: Array<{
    id: string;
    url: string;
    alt: string;
    type: string;
  }>;
  attributes: Array<{
    attribute: {
      id: string;
      name: string;
    };
    values: Array<{
      id: string;
      name: string;
    }>;
  }>;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  isAvailableForPurchase: boolean;
}

interface ProductsState {
  products: Product[];
  currentProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  filters: Record<string, string[]>;
}

const initialState: ProductsState = {
  products: [],
  currentProduct: null,
  isLoading: false,
  error: null,
  hasMore: true,
  filters: {},
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({
    filters,
    first = 12,
    search,
  }: {
    filters?: Record<string, string[]>;
    first?: number;
    search?: string;
  }) => {
    const attributeFilters = filters
      ? Object.entries(filters).map(([slug, values]) => ({
          slug,
          values,
        }))
      : [];

    const filterObject: any = {};
    if (attributeFilters.length > 0) {
      filterObject.attributes = attributeFilters;
    }
    if (search && search.trim()) {
      filterObject.search = search.trim();
    }

    const response = await fetch(
      "https://saleor-kombee.onrender.com/graphql/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          query GetProducts($first: Int!, $filter: ProductFilterInput) {
            products(
              first: $first,
              channel: "online-inr",
              filter: $filter
            ) {
              edges {
                node {
                  id
                  name
                  slug
                  description
                  defaultVariant {
                    id
                    name
                    sku
                    pricing {
                      price {
                        gross {
                          amount
                          currency
                        }
                      }
                    }
                  }
                  media {
                    id
                    url
                    alt
                    type
                  }
                  category {
                    id
                    name
                    slug
                  }
                  isAvailableForPurchase
                }
              }
            }
          }
        `,
          variables: {
            first,
            filter: filterObject,
          },
        }),
      }
    );

    const data = await response.json();
    return data.data.products.edges.map((edge: any) => edge.node);
  }
);

export const fetchProductBySlug = createAsyncThunk(
  "products/fetchProductBySlug",
  async ({ slug }: { slug: string }) => {
    const response = await fetch(
      "https://saleor-kombee.onrender.com/graphql/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          query GetProduct($slug: String, $channel: String) {
            product(slug: $slug, channel: $channel) {
              id
              name
              slug
              description
              seoTitle
              seoDescription
              defaultVariant {
                id
                name
                sku
                pricing {
                  priceUndiscounted {
                    gross {
                      amount
                      currency
                    }
                  }
                  price {
                    gross {
                      amount
                      currency
                    }
                  }
                }
              }
              variants {
                id
                name
                sku
                pricing {
                  price {
                    gross {
                      amount
                      currency
                    }
                  }
                }
                attributes {
                  attribute {
                    id
                    name
                  }
                  values {
                    id
                    name
                  }
                }
              }
              media {
                id
                url
                alt
                type
              }
              attributes {
                attribute {
                  id
                  name
                }
                values {
                  id
                  name
                }
              }
              category {
                id
                name
                slug
              }
              productType {
                id
                name
              }
              isAvailableForPurchase
              availableForPurchase
            }
          }
        `,
          variables: {
            slug,
            channel: "online-inr",
          },
        }),
      }
    );

    const data = await response.json();
    return data.data.product;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Record<string, string[]>>) => {
      state.filters = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(fetchProductBySlug.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch product";
      });
  },
});

export const { setFilters, clearFilters, clearError } = productsSlice.actions;
export default productsSlice.reducer;
