import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string;
  isStaff: boolean;
  userPermissions: Array<{ code: string }>;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"}/graphql/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          mutation {
            tokenCreate(email: "${email}", password: "${password}") {
              token
              user {
                email
                isStaff
                userPermissions {
                  code
                }
              }
              errors {
                field
                message
              }
            }
          }
        `,
        }),
      }
    );

    const data = await response.json();

    if (
      data.data.tokenCreate.errors &&
      data.data.tokenCreate.errors.length > 0
    ) {
      throw new Error(data.data.tokenCreate.errors[0].message);
    }

    return {
      token: data.data.tokenCreate.token,
      user: data.data.tokenCreate.user,
    };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    clearError: (state) => {
      state.error = null;
    },
    loadUserFromStorage: (state) => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token && user) {
        state.token = token;
        state.user = JSON.parse(user);
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Login failed";
      });
  },
});

export const { logout, clearError, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
