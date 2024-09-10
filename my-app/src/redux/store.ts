import {configureStore} from '@reduxjs/toolkit';
import { apiUser } from './slice/apiUserSlise';
import { apiUpload } from './slice/apiUploadFile';
import { apiPersonalArea } from './slice/apiPersonalArea';


const store = configureStore({
    reducer:{
        [apiUser.reducerPath]: apiUser.reducer,
        [apiUpload.reducerPath]: apiUpload.reducer,
        [apiPersonalArea.reducerPath]: apiPersonalArea.reducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiUser.middleware, apiUpload.middleware, apiPersonalArea.middleware),

});

export default store;