export const BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:4000" : "";
// export const BASE_URL = ''; // If using proxy
export const PRODUCTS_URL = "/api/products";
export const REVIEWS_URL = "/api/reviews"; //to implement catapi reice
export const USERS_URL = "/api/users";
export const ORDERS_URL = "/api/orders";
export const PROFILE_URL = "/api/profile";
export const PAYPAL_URL = "/api/config/paypal";
