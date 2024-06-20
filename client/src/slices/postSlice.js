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
      keepUnusedDataFor: 5,
      providesTags: ["post.model"],
    }),
    updatePost: builder.mutation({
      query: (data) => ({
        url: `${POST_URL}/updatepost/${data.postId}/${data.userId}`,
        method: "PUT",
        body: data,
      }),
    }),
    fetchPosts: builder.query({
      query: (userId) => ({
        url: `${POST_URL}/getposts?userId=${userId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["post.model"],
    }),
    fetchSinglePost: builder.query({
      query: (postId) => ({
        url: `${POST_URL}/getposts?postId=${postId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["post.model"],
    }),
    showMorePosts: builder.query({
      query: (userId, startIndex) => ({
        url: `${POST_URL}/getposts?userId=${userId}&startIndex=${startIndex}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["post.model"],
    }),
    deletePosts: builder.mutation({
      query: ({ postId, userId }) => ({
        url: `${POST_URL}/deletepost/${postId}/${userId}`,
        method: "DELETE",
      }),
      providesTags: ["post.model"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useFetchPostsQuery,
  useShowMorePostsQuery,
  useDeletePostsMutation,
  useFetchSinglePostQuery,
  useUpdatePostMutation,
} = createPostApiSlice;
