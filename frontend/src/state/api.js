import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }), 

  endpoints: (builder) => ({
    getInventoryDetails: builder.query({
      query: () => "inventorydetails", 
    }),
  }),
});

export const { useGetInventoryDetailsQuery } = api;
