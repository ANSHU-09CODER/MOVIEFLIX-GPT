import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideos } from "../utils/movieSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideos = useSelector((store) => store.movies.trailerVideos);

  // store ka trailer isi movie ka hai ya nahi
  const isSameMovie =
    trailerVideos && String(trailerVideos.movieId) === String(movieId);

  const getMoviesVideos = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );
      const json = await data.json();
      const results = json.results || [];

      const filterData = results.filter((video) => video.type === "Trailer");
      const trailer = filterData.length ? filterData[0] : results[0];

      // movieId saath mein store karo, taaki baad mein check ho sake
      dispatch(addTrailerVideos(trailer ? { ...trailer, movieId } : null));
    } catch (error) {
      console.error("Trailer fetch error:", error);
    }
  };

  useEffect(() => {
    movieId && !isSameMovie && getMoviesVideos();
      // ...
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);
};

export default useMovieTrailer;