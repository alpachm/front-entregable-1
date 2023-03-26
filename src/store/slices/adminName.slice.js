import { createSlice } from '@reduxjs/toolkit';

const adminNameSlice = createSlice({
  name: 'adminName',
  initialState: null,
  reducers: {
    setAdminName: (state, action) => action.payload,
  },
});

export default adminNameSlice.reducer;
export const { setAdminName } = adminNameSlice.actions;
