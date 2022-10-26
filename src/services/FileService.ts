import { IFile } from "./../models/IFile";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const fileAPI = createApi({
  reducerPath: "fileAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  tagTypes: ["File"],
  endpoints: (build) => ({
    fetchAllFiles: build.query<IFile[], number>({
      query: (limit: number = 5) => ({
        url: `/files`,
        params: {
          _limit: limit,
        },
      }),
      providesTags: (result) => ["File"],
    }),
    fetchFileById: build.query<IFile, number | undefined | null | string>({
      query: (id) => ({
        url: `/files/${id}`,
      }),
      providesTags: (result) => ["File"],
    }),
    createFile: build.mutation<IFile, IFile>({
      query: (file) => ({
        url: `/files`,
        method: "POST",
        body: file,
      }),
      invalidatesTags: ["File"],
    }),
    updateFile: build.mutation<IFile, IFile>({
      query: (file) => ({
        url: `/files/${file.id}`,
        method: "PUT",
        body: file,
      }),
      invalidatesTags: ["File"],
    }),
    deleteFile: build.mutation<IFile, IFile>({
      query: (file) => ({
        url: `/files/${file.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["File"],
    }),
  }),
});
