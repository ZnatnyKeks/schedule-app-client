import { ITeacher } from "@/entities/user";
import { API_URL } from "@/shared/lib/http";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token = localStorage.getItem('token')

export const teacherApi = createApi({
    reducerPath: "teacherApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}teacher` }),
    endpoints: (build) => ({
        fetchAllTeacher: build.query<ITeacher[], number>({
            query: () => ({
                url: "/all",
                credentials: "include",
                headers: { Authorization: `Bearer ${token}` }
            })
        }),
        fetchTeacherById: build.query<ITeacher, string>({
            query: (id) => ({
                url: "/one",
                credentials: "include",
                params: {
                    id: id
                },
                headers: { Authorization: `Bearer ${token}` }
            }),
        }),
    })
})