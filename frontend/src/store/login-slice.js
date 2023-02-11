import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "login",
    initialState: {email: "", password: "", success: false},
    reducers: {
        email: (state, action) => {
            state.email = action.payload;
        },
        password: (state, action) => {
            state.password = action.payload;
        }
    }
});

export const { email, password  } = loginSlice.actions;
export default loginSlice.reducer;