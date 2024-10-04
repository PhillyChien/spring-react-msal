import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import configSlice from "./slices/config-slice";
import userSlice from "./slices/user-slice";

const store = configureStore({
  reducer: {
    config: configSlice.reducer,
    user: userSlice.reducer,
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
