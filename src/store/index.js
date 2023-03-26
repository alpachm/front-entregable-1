import { configureStore } from '@reduxjs/toolkit';
import adminName from './slices/adminName.slice';

export default configureStore({
  reducer: { adminName },
});
