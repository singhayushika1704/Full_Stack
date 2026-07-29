import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchMockPosts } from '../../api/mockApi';

const postsAdapter = createEntityAdapter();

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetchMockPosts();
  return response;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: postsAdapter.addOne, 
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        postsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { postAdded } = postsSlice.actions;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
} = postsAdapter.getSelectors((state) => state.posts);

export default postsSlice.reducer;