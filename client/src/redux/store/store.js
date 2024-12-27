
import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from '../features/loaderSlice.js'
import userSlice from '../features/userSlice.js'
import chatSlice from '../features/chatSlice.js'
import messageSlice from '../features/messageSlice.js'

const store = configureStore({
    reducer: {
        loaderSlice,
        userSlice,
        chatSlice,
        messageSlice
    }
})


export default store