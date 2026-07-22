import {createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react';

import type { RootState } from '@/store';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,

  credentials: 'include',

  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    headers.set('Accept', 'application/json');

    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: 'api',

  baseQuery,

  tagTypes: [
    'Auth',
    'User',
    'Product',
    'Category',
    'Cart',
    'Order',
    'Payment',
  ],

  endpoints: () => ({}),
});