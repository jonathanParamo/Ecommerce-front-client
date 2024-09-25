import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = process.env.NEXT_PUBLIC_URL_SERVER || 'http://localhost:4000/api/v1/';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params) => {
    const { page = 1, limit = 20, category, subcategory } = params;

    // Construye la URL con los parámetros de consulta
    const url = new URL(`${API_URL}products/`);
    url.searchParams.append('page', page);
    url.searchParams.append('limit', limit);
    if (category) {
      url.searchParams.append('category', category);
    }

    if (subcategory) {
      url.searchParams.append('subcategory', subcategory);
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  }
);

export const searchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params) => {
    const { page = 1, limit = 20, category, subcategory, query } = params;

    // Construye la URL con los parámetros de consulta
    const url = new URL(`${API_URL}products/search`);
    url.searchParams.append('query', query);
    url.searchParams.append('page', page);
    url.searchParams.append('limit', limit);
    if (category) {
      url.searchParams.append('category', category);
    }

    if (subcategory) {
      url.searchParams.append('subcategory', subcategory);
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
    total: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export default productsSlice.reducer;
