import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./login-slice";
import filterSlice from "./filter-slice";
import accountSlice from "./account-slice";
import transactionSlice from "./transaction-slice";

const store = configureStore({
    reducer: {
        login: loginSlice,
        filter: filterSlice,
        accounts: accountSlice,
        transactions: transactionSlice
    }
});

export default store;