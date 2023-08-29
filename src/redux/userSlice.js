import {createSlice} from "@reduxjs/toolkit";


const usersReducer = createSlice({

name: "users",
initialState: {
    currentUser: null,
},

reducers : {
    SetCurrentUser(state, action){
        state.currentUser = action.payload;
    },
},
}); 

export const {SetCurrentUser} = usersReducer.actions;

export default usersReducer.reducer;