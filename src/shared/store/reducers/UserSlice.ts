import { AuthResponse } from "@/entities/auth/models/AuthResponse";
import { IUser } from "@/entities/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, logout, register } from "./ActionCreaters";

interface UserState {
    user: IUser;
    isLoading: boolean;
    error: string,
}
const initialState: UserState = {
    user: {} as IUser,
    isLoading: false,
    error: ''
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        removeError(state) {
            state.error = ''
        },
        gettingAuth(state) {
            state.isLoading = true
            state.error = ''

        },
        gettingAuthSuccess(state, action: PayloadAction<IUser>) {
            state.isLoading = false;
            state.error = ''
            state.user = action.payload

        },
        gettingAuthError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        }
    },
    extraReducers: {
        [login.fulfilled.type]: (state, action: PayloadAction<AuthResponse>) => {
            state.isLoading = false;
            state.error = '';
            state.user = action.payload.user;
        },
        [login.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [login.pending.type]: (state) => {
            state.error = ""
            state.isLoading = true;
        },

        [register.fulfilled.type]: (state, action: PayloadAction<AuthResponse>) => {
            state.isLoading = false;
            state.error = '';
            state.user = action.payload.user;

        },
        [register.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [register.pending.type]: (state) => {
            state.error = ""
            state.isLoading = true;
        },

        [logout.fulfilled.type]: (state) => {
            state.isLoading = false;
            state.error = '';
            state.user = {} as IUser;

        },
        [logout.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [logout.pending.type]: (state) => {
            state.error = ""
            state.isLoading = true;
        },
    }
})
export default userSlice.reducer;