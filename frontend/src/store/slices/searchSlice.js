import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: {
    city: '',
    propertyType: '',
    transactionType: 'rent',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
  },
  searchResults: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setFilters,
  clearFilters,
  setSearchResults,
  setLoading,
  setError,
  clearError,
} = searchSlice.actions;

export default searchSlice.reducer;