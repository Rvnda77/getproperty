import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
  messages: [],
  currentPropertyId: null,
  loading: false,
  error: null,
};

export const fetchMessages = createAsyncThunk(
  'message/fetchMessages',
  async (propertyId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/messages/${propertyId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  'message/sendMessage',
  async (messageData, { rejectWithValue }) => {
    try {
      const response = await api.post('/messages', messageData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setCurrentProperty: (state, action) => {
      state.currentPropertyId = action.payload;
      state.messages = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.loading = false;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export const { addMessage, setCurrentProperty, clearError } = messageSlice.actions;
export default messageSlice.reducer;