import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import formReducer from '../redux/slices/formSlice'
import weightsReducer from '../redux/slices/weightsSlice'

export const store = configureStore({
  reducer: {
    form: formReducer,
    weights: weightsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
