import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store.ts";

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const couterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.value -= action.payload;
    },
  },
});

export default couterSlice;
export const selectCounter = (state: RootState) => state.counter.value;
export const { increment, decrement } = couterSlice.actions;
