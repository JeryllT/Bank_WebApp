import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
    name: "transaction",
    initialState: {toView: null, data: []},
    reducers: {
        setToViewTran: (state, action) => {
            state.toView = action.payload;
        },
        setTransactions: (state, action) => {
            state.data = action.payload;
        }
    }
})

export const {setToViewTran, setTransactions} = transactionSlice.actions;
export default transactionSlice.reducer;