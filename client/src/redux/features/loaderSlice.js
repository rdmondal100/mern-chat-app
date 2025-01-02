
import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    loader: false
}
const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers:{
        showLoader:(state)=>{state.loader = true},
        hideLoader:(state)=>{state.loader = false}
    },
    extraReducers: (builder) => {
        builder.addCase("reset", () => initialState);
      },
})



export const {showLoader,hideLoader} = loaderSlice.actions


export default loaderSlice.reducer