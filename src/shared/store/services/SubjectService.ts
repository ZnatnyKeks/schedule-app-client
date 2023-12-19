import { ISubject } from "@/entities/Subject";
import { API_URL } from "@/shared/lib/http";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token = localStorage.getItem('token')


export const subjectApi = createApi({
    reducerPath: "subjectApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}subject` }),
    tagTypes: ['Subject'],
    endpoints: (build) => ({
        fetchAllSubjects: build.query<ISubject[], number>({
            query: () => ({
                url: "/all",
                credentials: "include",
                headers: { Authorization: `Bearer ${token}` }
            }),
            providesTags: () => ["Subject"]
        }),
        fetchSubjectById: build.query<ISubject, string>({
            query: (id) => ({
                url: "/one",
                credentials: "include",
                params: {
                    id: id
                },
                headers: { Authorization: `Bearer ${token}` }
            }),
        }),
        createSubject: build.mutation<ISubject, ISubject>({
            query: (subject) => ({
                url: "/create",
                credentials: "include",
                headers: { Authorization: `Bearer ${token}` },
                method: "POST",
                body: subject
            }),
            invalidatesTags: ['Subject']
        })
    })
})