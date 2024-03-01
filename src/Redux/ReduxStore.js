import {configureStore} from '@reduxjs/toolkit'
import ReduxSliceReducer from './ReduxSlice';
const ReduxStore = configureStore({
    reducer : {
        BlogApp:ReduxSliceReducer
    }
});
export default ReduxStore