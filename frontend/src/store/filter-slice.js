import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "filter",
    initialState: {sentDropdown: {}, receivedDropdown: {}, sentAccounts: [], receivedAccounts: []},
    reducers: {
        updateSentDropdown: (state, action) => {
            const key = action.payload[0]
            const value = action.payload[1]
            if (state.sentDropdown[key] == null) {
                state.sentDropdown[key] = [value]
            }
        },
        updateRecDropdown: (state, action) => {
            const key = action.payload[0]
            const value = action.payload[1]
            if (state.receivedDropdown[key] == null) {
                state.receivedDropdown[key] = [value]
            }
        },
        updateSentAccs: (state, action) => {
            state.sentAccounts = action.payload;
        },
        updateReceivedAccs: (state, action) => {
            state.receivedAccounts = action.payload;
        }
    }
});

export const { updateSentDropdown, updateRecDropdown, updateSentAccs, updateReceivedAccs } = filterSlice.actions;
export default filterSlice.reducer;

