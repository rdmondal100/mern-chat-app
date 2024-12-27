import { createSlice } from "@reduxjs/toolkit";




const initialState = {
    allChats: [],
    selectedChat: null,
}
const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {

        setAllChats: (state, action) => {
            // console.log(action.payload)
            state.allChats = action.payload.allChats
        },
        setSelectedChat: (state, action) => {
            console.log(action.payload)
            state.selectedChat = action.payload.selectedChat
        }

    }
})


export const { setAllChats, setSelectedChat } = chatSlice.actions

export default chatSlice.reducer