import {fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react';
import { PersonalAreaTypeRequest, PersonalAreaTypeResponse } from './typesData';



export const apiPersonalArea = createApi({
    reducerPath: 'personalAreaApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/personalArea',
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
        createPersonalData: builder.mutation<PersonalAreaTypeResponse, PersonalAreaTypeRequest>({
            query: (body) => ({
                url: '/categories',
                method: 'POST',
                body
            })
       }),

       getAllData: builder.query<PersonalAreaTypeResponse, void>({
        query: () => ({
            url: '/categories',
        })
      }),

      uploadAvatarPersonalData: builder.mutation<PersonalAreaTypeResponse, FormData>({
        query: (body) => (
       {
            url: '/categoriesUploadImg',
            method: 'POST',
            body
        })
   }),

      
    })
});


export const {useCreatePersonalDataMutation, useGetAllDataQuery, useUploadAvatarPersonalDataMutation}  = apiPersonalArea;


