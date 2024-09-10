import {fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { TaskCommentRequest } from "./typesData";


export const apiCommentsTaskSlice = createApi({
    reducerPath: 'commentsTaskapi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/commentsTask',
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
    createNewDiscussion: builder.mutation<void, TaskCommentRequest>({
        query: (body)=>({
            url: '/create',
            method: 'POST', 
            body
        })
    })
}),

  
});

export const {useCreateNewDiscussionMutation} = apiCommentsTaskSlice;

