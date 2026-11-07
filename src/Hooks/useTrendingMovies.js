import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addTrendingMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const useTrendingMovies = () => {
  const dispatch = useDispatch();

  const getTrendingMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
        API_OPTIONS
      );
      const json = await response.json();
      dispatch(addTrendingMovies(json.results));
    } catch (error) {
      console.error("TMDB fetch error:", error);
    }
  };

  useEffect(() => {
    getTrendingMovies();
  }, []);
};

export default useTrendingMovies;