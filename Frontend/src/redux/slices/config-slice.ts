import { createSlice } from "@reduxjs/toolkit";
import { removeAcquireTokenInterceptor } from "../../config/axiosConfig";

interface ConfigState {
  interceptorId: number | null;
}

const initialState: ConfigState = {
  interceptorId: null,
};

const configSlice = createSlice({
  name: "axios",
  initialState,
  reducers: {
    setInterceptorId: (state, action) => {
      state.interceptorId = action.payload;
    },
    removeAcquireToken: (state) => {
      if (state.interceptorId) {
        removeAcquireTokenInterceptor(state.interceptorId);
      }
      state.interceptorId = null;
    },
  },
});

export default configSlice;
export const { setInterceptorId, removeAcquireToken } = configSlice.actions;
