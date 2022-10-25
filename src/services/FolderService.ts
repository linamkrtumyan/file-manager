import { IFolder } from '../models/IFolder';
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";


export const folderAPI = createApi({
    reducerPath: 'folderAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080'}),
    tagTypes: ['Folder'],
    endpoints: (build) => ({
        fetchAllFolders: build.query<IFolder[], number>({
            query: (limit: number = 5) => ({
                url: `/folders`,
                params: {
                    _limit: limit
                }
            }),
            providesTags: result => ['Folder']
        }),
        createFolder: build.mutation<IFolder, IFolder>({
            query: (folder) => ({
                url: `/folders`,
                method: 'POST',
                body: folder
            }),
            invalidatesTags: ['Folder']
        }),
        updateFolder: build.mutation<IFolder, IFolder>({
            query: (folder) => ({
                url: `/folders/${folder.id}`,
                method: 'PUT',
                body: folder
            }),
            invalidatesTags: ['Folder']
        }),
        deleteFolder: build.mutation<IFolder, IFolder>({
            query: (folder) => ({
                url: `/folders/${folder.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Folder']
        }),
    })
})
