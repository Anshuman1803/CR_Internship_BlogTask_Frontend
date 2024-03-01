import {createSlice} from "@reduxjs/toolkit"
const ReduxSlice = createSlice({
    name : 'ReduxSlice',
    initialState : {
        IsActive : false,

    },
    reducers : {
        UserLoggedIn (state, actions){

        }

    }
});
export const  {UserLoggedIn} = ReduxSlice.actions;
export default ReduxSlice.reducer