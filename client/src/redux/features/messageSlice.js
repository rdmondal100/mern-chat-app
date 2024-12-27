import { createSlice } from "@reduxjs/toolkit"




const initialState = {

    allMessages: [],

}

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setAllMessages: (state, action) => {
            // console.log(action.payload)
            state.allMessages = action.payload.allMessages
        }
    }
})



export const { setAllMessages } = messageSlice.actions

export default messageSlice.reducer