import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const financeApi = createApi({
  reducerPath: "financeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://69d39887336103955f8f416a.mockapi.io/api/v1/" }),
  tagTypes: ["Transactions"],
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: () => "transactions",
      providesTags: ["Transactions"],
    }),
    addTransaction: builder.mutation({
      query: (newTx) => ({
        url: "transactions",
        method: "POST",
        body: newTx,
      }),
      invalidatesTags: ["Transactions"],
    }),
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `transactions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transactions"],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useAddTransactionMutation,
  useDeleteTransactionMutation,
} = financeApi;
