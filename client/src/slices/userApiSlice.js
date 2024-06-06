import { USER_AUTH_URL } from "../constant";
import { USER_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_AUTH_URL}/signin`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_AUTH_URL}/singup`,
        method: "POST",
        body: data,
      }),
    }),
    signInWithGoogle: builder.mutation({
      query: (data) => ({
        url: `${USER_AUTH_URL}/google`,
        method: "POST",
        body: data,
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/update/${data.userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSignInWithGoogleMutation,
  useUpdateUserProfileMutation,
} = userApiSlice;
