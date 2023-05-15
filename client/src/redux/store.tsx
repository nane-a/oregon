import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import formReducer from '../redux/slices/formSlice'
import weightsReducer from '../redux/slices/weightsSlice'
import pointsReducer from '../redux/slices/pointsSlice'
import distanceReducer from '../redux/slices/distanceSlice'
import statesReducer from '../redux/slices/statesSlice'

export const store = configureStore({
  reducer: {
    form: formReducer,
    weights: weightsReducer,
    points: pointsReducer,
    distance: distanceReducer,
    states: statesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
