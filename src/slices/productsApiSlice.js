import { PRODUCTS_URL, PROFILE_URL, REVIEWS_URL } from '../constants';
import { apiSlice } from './apiSlice';
// import { BASE_URL } from "../constants";
import { PRODUCTS_URL, PROFILE_URL, REVIEWS_URL } from "../constants";
import { apiSlice } from "./apiSlice";
// export const fullProductsUrl = `${BASE_URL}${PRODUCTS_URL}`;

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => PRODUCTS_URL,
      providesTags: ["Products"],
    }),

    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: (newProductData) => ({
        url: `${PRODUCTS_URL}`,
        method: "POST",
        body: newProductData,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: "POST",
        body: data,
      }),
    }),
    // !!Profile screen uses this!!
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    getReviewsById: builder.query({
      query: (productId) => ({
        url: `${REVIEWS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Reviews"],
    }),
    // product screen uses this

    createReview: builder.mutation({
      query: (data) => ({
        url: `${REVIEWS_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reviews"],
    }),

    createReviewCatAPI: builder.mutation({
      //added need to tell yaxin
      query: (data) => ({
        url: `${REVIEWS_URL}/catAPI`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    // !!Profile screen  this!!
    getMyProducts: builder.query({
      query: (userId) => ({
        url: `${PROFILE_URL}/${userId}/products`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),

    getReviewsById: builder.query({
      query: (productId) => ({
        url: `${REVIEWS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    getProductsByKeyword: builder.query({
      //this is created to enable search on shop database, it is used in CatAPISearch.js
      query: (keyword) => `api/search/${keyword}`,
      providesTags: ["Products"],
    }),

    getReviewsByUserId: builder.query({
      //added need to tell yaxin
      query: (userId) => ({
        url: `${PROFILE_URL}/${userId}/reviews`, // Changed from `api/users/${userId}/reviews`
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetReviewsByIdQuery,
  useGetProductsByKeywordQuery,
  useGetReviewsByUserIdQuery,
  useCreateReviewCatAPIMutation,
  useGetMyProductsQuery,
} = productsApiSlice;
