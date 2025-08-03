import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  quantity: number;
  variant: {
    id: string;
    name: string;
    product: {
      id: string;
      name: string;
      slug: string;
      thumbnail?: {
        url: string;
      };
    };
    pricing: {
      price: {
        gross: {
          amount: number;
          currency: string;
        };
      };
    };
  };
}

interface ShippingAddress {
  firstName: string;
  lastName: string;
  streetAddress1: string;
  city: string;
  countryArea: string;
  postalCode: string;
  country: string;
}

interface CartState {
  checkoutId: string | null;
  token: string | null;
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  totalPrice: {
    gross: {
      amount: number;
      currency: string;
    };
  } | null;
  shippingAddress: ShippingAddress | null;
  shippingMethod: {
    id: string;
    name: string;
    price: {
      amount: number;
      currency: string;
    };
  } | null;
  availableShippingMethods: Array<{
    id: string;
    name: string;
    price: {
      amount: number;
      currency: string;
    };
  }>;
}

const initialState: CartState = {
  checkoutId: null,
  token: null,
  items: [],
  isLoading: false,
  error: null,
  totalPrice: null,
  shippingAddress: null,
  shippingMethod: null,
  availableShippingMethods: [],
};

export const createCheckout = createAsyncThunk(
  "cart/createCheckout",
  async ({
    variantId,
    quantity,
    email,
  }: {
    variantId: string;
    quantity: number;
    email: string;
  }) => {
    const response = await fetch(
      "https://saleor-kombee.onrender.com/graphql/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          mutation AddToCart($input: CheckoutCreateInput!) {
            checkoutCreate(input: $input) {
              checkout {
                id
                token
                lines {
                  id
                  quantity
                  variant {
                    id
                    name
                    product {
                      id
                      name
                      slug
                      thumbnail {
                        url
                      }
                    }
                    pricing {
                      price {
                        gross {
                          amount
                          currency
                        }
                      }
                    }
                  }
                }
              }
              errors {
                field
                message
              }
            }
          }
        `,
          variables: {
            input: {
              channel: "online-inr",
              lines: [
                {
                  quantity,
                  variantId,
                },
              ],
              email,
            },
          },
        }),
      }
    );

    const data = await response.json();

    if (
      data.data.checkoutCreate.errors &&
      data.data.checkoutCreate.errors.length > 0
    ) {
      throw new Error(data.data.checkoutCreate.errors[0].message);
    }

    return data.data.checkoutCreate.checkout;
  }
);

export const updateShippingAddress = createAsyncThunk(
  "cart/updateShippingAddress",
  async ({
    checkoutId,
    shippingAddress,
  }: {
    checkoutId: string;
    shippingAddress: ShippingAddress;
  }) => {
    const response = await fetch(
      "https://saleor-kombee.onrender.com/graphql/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          mutation SetShippingAddress($checkoutId: ID!, $shippingAddress: AddressInput!) {
            checkoutShippingAddressUpdate(checkoutId: $checkoutId, shippingAddress: $shippingAddress) {
              checkout {
                id
                shippingAddress {
                  id
                  firstName
                  lastName
                  streetAddress1
                  city
                  countryArea
                  postalCode
                  country {
                    code
                  }
                }
              }
              errors {
                field
                message
              }
            }
          }
        `,
          variables: {
            checkoutId,
            shippingAddress,
          },
        }),
      }
    );

    const data = await response.json();

    if (
      data.data.checkoutShippingAddressUpdate.errors &&
      data.data.checkoutShippingAddressUpdate.errors.length > 0
    ) {
      throw new Error(
        data.data.checkoutShippingAddressUpdate.errors[0].message
      );
    }

    return data.data.checkoutShippingAddressUpdate.checkout;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setShippingMethod: (state, action) => {
      state.shippingMethod = action.payload;
    },
    clearCart: (state) => {
      state.checkoutId = null;
      state.token = null;
      state.items = [];
      state.totalPrice = null;
      state.shippingAddress = null;
      state.shippingMethod = null;
      state.availableShippingMethods = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCheckout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCheckout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.checkoutId = action.payload.id;
        state.token = action.payload.token;
        state.items = action.payload.lines;
      })
      .addCase(createCheckout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to add to cart";
      })
      .addCase(updateShippingAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateShippingAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shippingAddress = action.payload.shippingAddress;
      })
      .addCase(updateShippingAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || "Failed to update shipping address";
      });
  },
});

export const { clearError, setShippingMethod, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
