import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (userData) => ({
        url: '/auth/signin',
        method: 'POST',
        body: userData,
      }),
    }),
    signUp: builder.mutation<void, { name: string; email: string; password: string; phoneNumber?: string, address: string }>({
      query: (userData) => ({
        url: '/auth/signup', 
        method: 'POST',
        body: userData,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    forgotPassword: builder.mutation<void, string>({
      query: (email) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: { email },
      }),
    }),
    resetPassword: builder.mutation<void, { token: string; newPassword: string }>({
      query: ({ token, newPassword }) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: { token, newPassword },
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { 
  useSignInMutation, 
  useSignUpMutation, // Exporting the new signUp hook
  useLogoutMutation, 
  useForgotPasswordMutation, 
  useResetPasswordMutation 
} = authApi;
