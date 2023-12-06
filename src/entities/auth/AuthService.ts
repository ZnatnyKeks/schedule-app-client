import { API_URL } from "@/shared/lib/http";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthResponse } from "./models/AuthResponse";
import { AuthRequest } from "./models/AuthRequest";
import { RegisterRequest } from "./models/RegisterRequest";

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, AuthRequest>({
      query: (AuthRequest) => ({
        url: `auth/login`,
        method: "POST",
        body: AuthRequest,
      }),
    }),
    registration: builder.mutation<AuthResponse, RegisterRequest>({
      query: (RegisterRequest) => ({
        url: `auth/registration`,
        method: "POST",
        body: RegisterRequest,
      }),
    }),
    logout: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `auth/registration/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});
