import { apiSlice } from "../services/apiSlice";




const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    retrieveUser: builder.query({
      query: () => '/users/me/',
    }),
    login: builder.mutation({
      query: ({username, password}) => ({
        url: '/jwt/create/',
        method: 'POST',
        body: {
          username,
          password,
        },
      }),
    }),
    verify: builder.mutation({
      query: () => ({
        url: '/jwt/verify/',
        method: 'POST',
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout/',
        method: 'POST',
      }),
    }),
    resetPassword: builder.mutation({
      query: ({email}) => ({
        url: '/users/reset_password/',
        method: 'POST',
        body: {
          email,
        },
      }),
    }),
    resetPasswordConfirm: builder.mutation({
      query: ({uid,token, new_password, re_new_password}) => ({
        url: '/users/reset_password_confirm/',
        method: 'POST',
        body: {
          uid,
          token, 
          new_password,
          re_new_password,          
        },
      }),
    }),
  }),
});

export const { 
    useRetrieveUserQuery,
	useLoginMutation,
	useVerifyMutation,
	useLogoutMutation,
	useResetPasswordMutation,
	useResetPasswordConfirmMutation,
    
} = authApiSlice;
