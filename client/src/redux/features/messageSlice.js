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
    },
    extraReducers: (builder) => {
        builder.addCase("reset", () => initialState);
      },
})



export const { setAllMessages } = messageSlice.actions

export default messageSlice.reducer