import { IClass } from "@/entities/Class";
import { API_URL } from "@/shared/lib/http";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token = localStorage.getItem('token')


export const classApi = createApi({
    reducerPath: "classApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}class` }),
    endpoints: (build) => ({
        fetchAllClasses: build.query<IClass[], number>({
            query: () => ({
                url: "/all",
                credentials: "include",
                headers: { Authorization: `Bearer ${token}` }
            })
        }),
        createClass: build.mutation<IClass, IClass>({
            query: (classData) => ({
                url: "/create",
                credentials: "include",
                headers: { Authorization: `Bearer ${token}` },
                method: "POST",
                body: classData
            })
        })
    })
})