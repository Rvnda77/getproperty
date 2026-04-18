import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
  properties: [],
  currentProperty: null,
  loading: false,
  error: null,
};

export const fetchProperties = createAsyncThunk(
  'property/fetchProperties',
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get('/properties', { params });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchPropertyById = createAsyncThunk(
  'property/fetchPropertyById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/properties/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createProperty = createAsyncThunk(
  'property/createProperty',
  async (propertyData, { rejectWithValue }) => {
    try {
      const response = await api.post('/properties', propertyData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentProperty: (state, action) => {
      state.currentProperty = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.properties = action.payload;
        state.loading = false;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.currentProperty = action.payload;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.properties.push(action.payload);
      });
  },
});

export const { clearError, setCurrentProperty } = propertySlice.actions;
export default propertySlice.reducer;