import { configureStore } from '@reduxjs/toolkit';
import  useReducer  from './userSlice';
// create a store
const store = configureStore({
    reducer:{
    users : useReducer
    }
  });

  export default store;