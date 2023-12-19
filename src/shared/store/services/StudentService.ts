import { IStudent } from "@/entities/user";
import { API_URL } from "@/shared/lib/http";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token = localStorage.getItem('token')

export const studentApi = createApi({
    reducerPath: "studentApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}student` }),
    endpoints: (build) => ({
        fetchAllStudents: build.query<IStudent[], number>({
            query: () => ({
                url: "/all",
                credentials: "include",
                headers: { Authorization: `Bearer ${token}` }
            })
        })
    })
})