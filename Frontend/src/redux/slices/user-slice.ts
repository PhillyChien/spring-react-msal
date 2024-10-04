import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Role } from "../../constants/role-enum";

interface UserState {
  userId: number | null;
  email: string | null;
  roles: Role[];
}

const initialState: UserState = {
  userId: null,
  email: null,
  roles: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ userId: number; email: string; roles: Role[] }>
    ) => {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.roles = action.payload.roles;
    },
    removeUser: (state) => {
      state.userId = null;
      state.email = null;
      state.roles = [];
    },
  },
});

export default userSlice;
export const { setUser, removeUser } = userSlice.actions;
