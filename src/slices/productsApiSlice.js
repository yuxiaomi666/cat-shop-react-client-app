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
      query: () => ({
        url: `${PRODUCTS_URL}`,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
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
    // createReview: builder.mutation({
    //   query: (data) => ({
    //     url: `${PRODUCTS_URL}/${data.productId}/reviews`,
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Product"],
    // }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${REVIEWS_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    createReviewCatAPI: builder.mutation({
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
    useCreateReviewCatAPIMutation,
  useGetMyProductsQuery,
  useGetReviewsByIdQuery,
} = productsApiSlice;
