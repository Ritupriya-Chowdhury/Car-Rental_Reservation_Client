import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type TUser = {
    name: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
};

type TAuthState = {
    user: TUser | null; // Allow user to be null
    token: string | null; // Allow token to be null
};

const initialState: TAuthState = {
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user, token } = action.payload;
            state.user = user; // This can be TUser or null
            state.token = token; // This can be string or null
            // console.log("UserInfo:",state.user);
        },
        logout: (state) => {
            state.user = null; // Set user to null on logout
            state.token = null; // Set token to null on logout
        },
    },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.user;
