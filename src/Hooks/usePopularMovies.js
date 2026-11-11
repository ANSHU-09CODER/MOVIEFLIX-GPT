import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movies.popularMovies);

  const getPopularMovies = async () => {
    try {
      const data = await fetch("/api/tmdb?path=movie/popular&page=1");
      const json = await data.json();
      dispatch(addPopularMovies(json.results));
    } catch (error) {
      console.error("TMDB fetch error:", error);
    }
  };

  useEffect(() => {
    !popularMovies && getPopularMovies();
      // ...
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default usePopularMovies;