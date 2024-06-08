import { POST_URL } from "../constant.js";
import { apiSlice } from "./apiSlice.js";

export const createPostApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({
        url: `${POST_URL}/create-post`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreatePostMutation } = createPostApiSlice;
