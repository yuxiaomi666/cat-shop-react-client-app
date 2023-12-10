import { apiSlice } from './apiSlice';
import { USERS_URL, PROFILE_URL } from '../constants';



export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/signin`,
                method: 'POST',
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/signup`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/signout`,
                method: 'POST',
            }),
        }),
        // update profile button at profile screen
        profile: builder.mutation({
            query: (data) => ({
                url: `${PROFILE_URL}/${data._id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        
        getUsers: builder.query({
            query: () => ({
                url: USERS_URL,
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5,
        }),
        
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
        
        getUserDetails: builder.query({
            query: (id) => ({
                url: `${USERS_URL}/${id}`,
            }),
            keepUnusedDataFor: 5,
        }),
        
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${PROFILE_URL}/${data._id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        
        getManagedUsers: builder.query({
            query: (userId) => ({
                url: `${PROFILE_URL}/${userId}/users`,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['User'],
        }),
        getOtherUserProfile: builder.query({
            query: (userId) => ({
                url: `${PROFILE_URL}/${userId}`,
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});
// auto generated hooks by RTK(Redux Toolkit) Query from the endpoints object
export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useProfileMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
    useUpdateUserMutation,
    useGetUserDetailsQuery,
    useGetManagedUsersQuery,
    useGetOtherUserProfileQuery,
} = userApiSlice;
