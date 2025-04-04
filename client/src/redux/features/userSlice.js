import { createSlice } from "@reduxjs/toolkit";




const initialState = {
    isAuthenticated: false,
    userData: null,
    allUsersData: [],
    status: 'idle',
    onlineUsers: [],
    requests:[],
    showRequests:false
}
const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            console.log(action.payload)
            
            if (action.payload.isAuthenticated) {
                state.isAuthenticated = action.payload.isAuthenticated
            }
            if (action.payload.userData) {
                state.userData = action.payload.userData
            }
            if (action.payload.status) {
                state.status = action.payload.status
            }
        },
        setAllUsers: (state, action) => {
            // console.log(action.payload)
            state.allUsersData = action.payload.allUsersData
        },
        setOnlineUsers: (state, action) => {
            console.log(action.payload)
            state.onlineUsers = action.payload.onlineUsers
        },
        setFriendRequests:(state,action)=>{
            console.log(action.payload)
            state.requests = action.payload.requests
        },
        setShowRequests:(state,action)=>{
            console.log(action.payload)
            state.showRequests = action.payload.showRequests
        }

    },
    extraReducers: (builder) => {
        builder.addCase("reset", () => initialState);
      },
})


export const { setUser, setAllUsers, setOnlineUsers,setShowRequests } = userSlice.actions

export default userSlice.reducer