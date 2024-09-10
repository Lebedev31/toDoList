import {fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react';
import { TaskData, UploadCreateTask } from './typesData';

export const apiUpload = createApi({
    reducerPath: 'uploadApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/upload',
                               prepareHeaders: (headers)=>{
                                               const token = localStorage.getItem('key');
                                               if (token) {
                                                headers.set('authorization', `Bearer ${token}`);
                                               }
                                               return headers;
                               }
    },
                             
    ),
    endpoints: (builder) => ({
       createTask: builder.mutation<TaskData, UploadCreateTask | FormData>({
            query: (body) => ({
                url: '/chunkFile',
                method: 'POST',
                body
            })
       }),

       getAllTasks: builder.query<TaskData, void>({
         query: ()=>({
            url: '/getAllTasks'
         })
       }),

       deleteTask: builder.mutation({
        query: (id)=>({
           url: `/deleteTask/${id}`,
           method: "DELETE"
        })
      }),
 
    })
});

export const {useCreateTaskMutation, useGetAllTasksQuery, useDeleteTaskMutation} = apiUpload;