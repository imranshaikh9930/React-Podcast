import  {configureStore} from '@reduxjs/toolkit';
import  userReducer from '../src/slices/userSlice';
import PodCastsReducer from '../src/slices/podcasts';


export default configureStore({
    reducer:{
        user:userReducer,
        podcasts:PodCastsReducer
    }
})