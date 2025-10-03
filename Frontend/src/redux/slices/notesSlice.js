import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import toast from 'react-hot-toast';

export const fetchNotes = createAsyncThunk(
  'notes/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/notes');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const createNote = createAsyncThunk(
  'notes/create',
  async (noteData, { rejectWithValue }) => {
    try {
      const response = await api.post('/notes/create', noteData);
      toast.success('Note created successfully!');
      return response.data.data;
    } catch (error) {
      toast.error('Failed to create note');
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const updateNote = createAsyncThunk(
  'notes/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/notes/update/${id}`, data);
      toast.success('Note updated successfully!');
      return response.data.data;
    } catch (error) {
      toast.error('Failed to update note');
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const deleteNote = createAsyncThunk(
  'notes/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/notes/delete/${id}`);
      toast.success('Note deleted successfully!');
      return id;
    } catch (error) {
      toast.error('Failed to delete note');
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    loading: false,
    error: null,
    searchQuery: '',
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.notes.unshift(action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const index = state.notes.findIndex(note => note._id === action.payload._id);
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter(note => note._id !== action.payload);
      });
  },
});

export const { setSearchQuery } = notesSlice.actions;
export default notesSlice.reducer;
