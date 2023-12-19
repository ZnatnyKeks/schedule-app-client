import { IGroup } from "@/entities/Group";
import { API_URL } from "@/shared/lib/http";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token = localStorage.getItem('token')


export const groupApi = createApi({
    reducerPath: "groupApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}group` }),
    endpoints: (build) => ({
        fetchAllGroups: build.query<IGroup[], number>({
            query: () => ({
                url: "/all",
                credentials: "include",
                headers: { Authorization: `Bearer ${token}` }
            })
        }),
        createGroup: build.mutation<IGroup, IGroup>({
            query: (group) => ({
                url: "/create",
                credentials: "include",
                headers: { Authorization: `Bearer ${token}` },
                method: "POST",
                body: group
            })
        })
    })
})