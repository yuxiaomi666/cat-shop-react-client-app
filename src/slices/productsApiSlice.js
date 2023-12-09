import { PRODUCTS_URL, PROFILE_URL, REVIEWS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getProducts: builder.query({
            query: ({ keyword, pageNumber }) => ({
                url: PRODUCTS_URL,
                params: { keyword, pageNumber },
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
        }),
        // product screen uses this
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        // profile page uses this
        createProduct: builder.mutation({
            query: (newProductData) => ({
                url: `${PRODUCTS_URL}`,
                method: 'POST',
                body: newProductData,
            }),
            invalidatesTags: ['Product'],
        }),
        // profile page uses this
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: `/api/upload`,
                method: 'POST',
                body: data,
            }),
        }),
        // !!Profile screen uses this!!
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),
        // product screen uses this
        getReviewsById: builder.query({
            query: (productId) => ({
                url: `${REVIEWS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        // product screen uses this
        createReview: builder.mutation({
            query: (data) => ({
                url: `${REVIEWS_URL}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
        getTopProducts: builder.query({
            query: () => `${PRODUCTS_URL}/top`,
            keepUnusedDataFor: 5,
        }),
        // !!Profile screen  this!!
        getMyProducts: builder.query({
            query: (userId) => ({
                url: `${PROFILE_URL}/${userId}/products`,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Product'],
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
    useGetTopProductsQuery,
    useGetMyProductsQuery,
    useGetReviewsByIdQuery,
} = productsApiSlice;
