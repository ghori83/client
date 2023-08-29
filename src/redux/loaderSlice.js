import {createSlice} from "@reduxjs/toolkit";


const loadersReducer = createSlice({

name: "loaders",
initialState: {
    loading: false,
},

reducers : {
    SetLoading(state, action){
        state.loading = action.payload;
    },
},
}); 

export const {SetLoading} = loadersReducer.actions;

export default loadersReducer.reducer;