import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "users",
    initialState: {
        users: []
    },
    reducers: {

    }
})


// eslint-disable-next-line no-empty-pattern
export const {} = userSlice.actions;
export default userSlice.reducer;
