import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
return (
  <div className="bg-black">
    <div className="relative z-20 -mt-20 md:-mt-36 pb-10">
      <MovieList title="Trending Now" movies={movies?.trendingMovies} />
      <MovieList title="Now Playing" movies={movies?.nowPlayingMovies} />
      <MovieList title="Popular" movies={movies?.popularMovies} />
      <MovieList title="Top Rated" movies={movies?.topRatedMovies} />
      <MovieList title="Upcoming" movies={movies?.upcomingMovies} />
    </div>
  </div>
);
};

export default SecondaryContainer;