import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookBuddyApi = createApi({
    reducerPath: "bookBuddyApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books",
    }),
    endpoints: (builder) => ({
        getAllBooks: builder.query({
            query: () => ({ url: "/" }),
        }),
    }),
});

export const { useGetAllBooksQuery } = bookBuddyApi;