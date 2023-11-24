import { createSlice } from "@reduxjs/toolkit";


const initialValue ={
    value:{}
}

const acountSlince = createSlice({
    name : "user",
    initialState: initialValue,
    reducers:{
        setValue : (state, action) => {
            state.value = action.payload
        }
    }
})

export const {setValue} = acountSlince.actions
export default acountSlince.reducer