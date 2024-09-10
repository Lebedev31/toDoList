import {fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react';
import { FormValue, ResponseRegistration, AuthValue, ResponseAuth } from './typesData';



export const apiUser = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/user'}),
    endpoints: (builder) => ({
       addUser: builder.mutation<ResponseRegistration, FormValue>({
            query: (body) => ({
                url: '/register',
                method: 'POST',
                body
            })
       }),

      authUser: (builder).mutation<ResponseAuth, AuthValue>({
         query: (body) =>({
            url: '/auth',
            method: 'POST',
            body
         })
      })
    })
});


export const {useAddUserMutation, useAuthUserMutation} = apiUser;