export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_TOKEN}`,
  },
};

export const GROQ_KEY = process.env.REACT_APP_GROQ_KEY;

export const IMAGE_CDN_URL = "https://image.tmdb.org/t/p/w342";
console.log("TMDB token length:", process.env.REACT_APP_TMDB_TOKEN?.length);