import {fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { TaskCommentRequest, Comments, CreateComment } from "./typesData";


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
    }),

    getAllDiscussion: builder.query<Comments, void>({
        query: ()=>({
            url: '/getComment',
        })
      }), 

    checkLikes: builder.mutation<Comments, string>({
        query: (id)=>({
            url: '/checkLikes',
            method: 'PATCH',
            body: id
        })
      }),

      createComment: builder.mutation<Comments, CreateComment>({
        query: (id)=>({
            url: '/createComment',
            method: 'POST',
            body: id
        })
      }),
      

    }),

});

export const {useCreateNewDiscussionMutation, 
              useGetAllDiscussionQuery,
              useCheckLikesMutation,
              useCreateCommentMutation} = apiCommentsTaskSlice;

