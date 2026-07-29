import { createSlice } from '@reduxjs/toolkit';

const initialState = { title: '', content: '' };

const draftsSlice = createSlice({
  name: 'drafts',
  initialState,
  reducers: {
    updateDraft: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearDraft: () => initialState,
  },
});

export const { updateDraft, clearDraft } = draftsSlice.actions;
export const selectDraft = (state) => state.drafts;
export default draftsSlice.reducer;