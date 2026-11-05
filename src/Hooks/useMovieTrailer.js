import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideos } from "../utils/movieSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const getMoviesVideos = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS,
    );

    const json = await data.json();
    const results = json.results || [];

    const filterData = results.filter((video) => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : results[0];

    dispatch(addTrailerVideos(trailer || null));
  };

  useEffect(() => {
    if (!movieId) return;
    dispatch(addTrailerVideos(null));
    getMoviesVideos();
  }, [movieId]);
};

export default useMovieTrailer;