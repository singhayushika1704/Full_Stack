import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: 'p1', name: 'LinkedIn' },
  { id: 'p2', name: 'Twitter' },
  { id: 'p3', name: 'Facebook' },
  { id: 'p4', name: 'Instagram' },
];

const platformsSlice = createSlice({
  name: 'platforms',
  initialState,
  reducers: {},
});

export const selectAllPlatforms = (state) => state.platforms;
export default platformsSlice.reducer;