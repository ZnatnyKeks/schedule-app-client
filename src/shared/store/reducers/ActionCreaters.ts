import api, { API_URL } from "@/shared/lib/http";
import { AuthResponse } from "@/entities/auth/models/AuthResponse";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthRequest } from "@/entities/auth/models/AuthRequest";
import { RegisterRequest } from "@/entities/auth/models/RegisterRequest";
import axios, { AxiosError } from "axios";

export const login = createAsyncThunk(
    'user/login',
    async (authRequest: AuthRequest, thunkApi) => {
        try {
            const response = await axios.post<AuthResponse>(`${API_URL}auth/login`, { ...authRequest }, { withCredentials: true })
            localStorage.setItem('token', response.data.accessToken)
            localStorage.setItem('user', JSON.stringify(response.data.user))
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 404) {
                    return thunkApi.rejectWithValue("Пользователь не найден")
                }
            }
            return thunkApi.rejectWithValue("Logining error");
        }
    }
)
export const register = createAsyncThunk(
    'user/registration',
    async (registerRequest: RegisterRequest, thunkApi) => {
        try {
            const response = await axios.post<AuthResponse>(`${API_URL}auth/registration`, { ...registerRequest }, { withCredentials: true })
            localStorage.setItem('token', response.data.accessToken)
            localStorage.setItem('user', JSON.stringify(response.data.user))
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 409) {
                    return thunkApi.rejectWithValue("Пользователь с таким email уже существует")
                }
            }
            return thunkApi.rejectWithValue("Неизвестная ошибка регистрации");
        }
    }
)
export const logout = createAsyncThunk(
    'user/logout',
    async (_, thunkApi) => {
        try {
            await api.delete<void>('auth/logout')
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        } catch (error) {
            return thunkApi.rejectWithValue("Logout error");
        }
    }
)
export const nextPair = createAsyncThunk(
    'user/next-pair',
    async (userId:string, thunkApi) => {
        try {
            const response = await api.post<void>(`user/next-pair/${userId}`)
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue("Getting pair error");
        }
    }
)

