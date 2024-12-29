import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "users",
    initialState: {
        users: []
    },
    reducers: {
        getUser : (state, action) => {
            state.users = action.payload.map(user => {
               return{
               id: user._id,
               name: user.name,
               email: user.email,
               age: user.age
               }
            })
        },
        addUser :(state, action) =>{
            state.users.push(action.payload)
        },
        UpdateUser :(state, action) =>{
          const index = state.users.findIndex(x => x.id === action.payload.id)
          state.users[index]={
            id: action.payload.id,
            name: action.payload.name,
            email: action.payload.email,
            age: action.payload.age
          }
        },

        deleteUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        }
    }
})



export const {getUser, addUser, UpdateUser, deleteUser} = userSlice.actions;
export default userSlice.reducer;
