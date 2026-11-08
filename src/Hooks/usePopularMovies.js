import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const usePopularMovies =()=>
{
    const dispatch = useDispatch();

  const getPopularMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?&page=1",
        API_OPTIONS
      );
      const json = await response.json();
      console.log(json.results);
      dispatch(addPopularMovies(json.results)); 
    } catch (error) {
      console.error("TMDB fetch error:", error);
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, []);
}

export default usePopularMovies;