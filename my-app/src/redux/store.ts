import {configureStore} from '@reduxjs/toolkit';
import { apiUser } from './slice/apiUserSlise';
import { apiUpload } from './slice/apiUploadFile';
import { apiPersonalArea } from './slice/apiPersonalArea';
import {apiCommentsTaskSlice} from './slice/apiCommentsTaskSlice'


const store = configureStore({
    reducer:{
        [apiUser.reducerPath]: apiUser.reducer,
        [apiUpload.reducerPath]: apiUpload.reducer,
        [apiPersonalArea.reducerPath]: apiPersonalArea.reducer,
        [apiCommentsTaskSlice.reducerPath]: apiCommentsTaskSlice.reducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiUser.middleware, apiUpload.middleware, apiPersonalArea.middleware, apiCommentsTaskSlice.middleware),

});

export default store;