import {createSlice} from "@reduxjs/toolkit";

const accountSlice = createSlice({
    name: "account",
    initialState: {data: [], user: null, token: null},
    reducers: {
        setUser: (state, action) => {
          state.user = action.payload;  
        },
        setToken: (state, action) => {
            const token = `bearer ${action.payload}`
            state.token = token;
        },
        setAccounts: (state, action) => {
            state.data = action.payload;
        }
    }
})

export const {setAccounts, setUser, setToken} = accountSlice.actions;
export default accountSlice.reducer;


