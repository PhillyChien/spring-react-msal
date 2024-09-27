import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import couterSlice from "./slices/counter-slice";

const store = configureStore({
  reducer: {
    counter: couterSlice.reducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
