import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
};

// const testUserInfo = {
//     _id: '64346cff70fbb2e67e8d47c1',
//     name: 'Jane Doe',
//     email: 'jane@email.com',
//     role: 'admin',
//     isAdmin: false,
// }

// const initialState = {
//     userInfo: localStorage.getItem('userInfo')
//         ? JSON.parse(localStorage.getItem('userInfo'))
//         : testUserInfo,
// };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logout: (state, action) => {
            state.userInfo = null;
            // NOTE: here we need to also remove the cart from storage so the next
            // logged in user doesn't inherit the previous users cart and shipping
            localStorage.clear();
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
