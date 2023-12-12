import axios from "axios";

export const PETFINDER_API = "https://api.petfinder.com/v2";
export const API_KEY = "aeNCBLaDRZT2qKQnXsMAuqNoGUpUnMoEhUYaMxshdWiPkeaDz6";
export const SECRET_KEY = "OfcbqNunKn05WlIX7myWqEGmk8HPUAehzcQ6MoPV";
//export const API_KEY = process.env.REACT_APP_PETFINDER_API_KEY;
//export const SECRET_KEY = process.env.REACT_APP_PETFINDER_SECRET_KEY;

let accessToken = null;
let tokenExpiration = 0;

async function fetchAccessToken() {
  // Check if the token is still valid
  if (accessToken && Date.now() < tokenExpiration) {
    return accessToken;
  }

  const tokenUrl = "https://api.petfinder.com/v2/oauth2/token";
  const body = `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${SECRET_KEY}`;

  try {
    const response = await axios.post(tokenUrl, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    accessToken = response.data.access_token;
    // Set the token expiration time (in milliseconds)
    tokenExpiration = Date.now() + response.data.expires_in * 1000;

    return accessToken;
  } catch (error) {
    console.error("Error fetching access token:", error.message);
    throw error;
  }
}

export const fetchCats = async (searchTerm) => {
  try {
    const token = await fetchAccessToken();

    const apiUrl = `${PETFINDER_API}/animals?type=cat&breed=${searchTerm}`;

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.animals;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

export const fetchCatById = async (id) => {
  try {
    const token = await fetchAccessToken();

    const apiUrl = `${PETFINDER_API}/animals/${id}`;

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.animal;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};