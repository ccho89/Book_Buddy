import { configureStore } from "@reduxjs/toolkit";
import { bookBuddyApi } from './bookBuddyApi'
import { userSlice } from './userSlice';

const store = configureStore({
    reducer: {
        bookBuddyApi: bookBuddyApi.reducer,
        userSlice: userSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bookBuddyApi.middleware),
});

export * from "./bookBuddyApi";
export * from "./userSlice";

export default store;
