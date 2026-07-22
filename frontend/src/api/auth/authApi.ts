import { baseApi } from '@/api/baseApi';

import type {
  ApiResponse,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from '@/types/auth';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<
      AuthResponse,
      RegisterRequest
    >({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),

      invalidatesTags: ['Auth'],
    }),

    login: builder.mutation<
      AuthResponse,
      LoginRequest
    >({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),

      invalidatesTags: ['Auth'],
    }),

    logout: builder.mutation<
      ApiResponse<null>,
      void
    >({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),

      invalidatesTags: ['Auth'],
    }),

    getCurrentUser: builder.query<
      ApiResponse<User>,
      void
    >({
      query: () => ({
        url: '/auth/me',
      }),

      providesTags: ['Auth'],
    }),

    refreshToken: builder.mutation<
      AuthResponse,
      void
    >({
      query: () => ({
        url: '/auth/refresh-token',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useRefreshTokenMutation,
} = authApi;