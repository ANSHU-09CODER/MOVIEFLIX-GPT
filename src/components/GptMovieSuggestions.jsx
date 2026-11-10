import { useSelector } from "react-redux";
import MoviesCard from "./MoviesCard";

const GptMovieSuggestions = () => {
  const results = useSelector((store) => store.movies?.gptMovieResults);

  if (!results) return null;

 if (results.length === 0) {
  return (
    <p className="mt-8 text-gray-300 text-center">
      No movies found. Please try a different search.
    </p>
  );
}

  return (
    <div className="mt-8 w-full max-w-6xl bg-black/70 rounded-lg p-4 md:p-6">
      <h2 className="text-white text-xl md:text-2xl font-bold mb-4">
        Suggested for you
      </h2>
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        {results.map((movie) => (
          <MoviesCard
            key={movie.id}
            id={movie.id}
            poster_path={movie.poster_path}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;