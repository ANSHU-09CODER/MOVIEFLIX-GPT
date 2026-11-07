import MoviesCard from "./MoviesCard";

const MovieList = ({ title, movies }) => {
  if (!movies) return null;

  return (
    <div className="px-6 md:px-16">
      <h1 className="text-lg md:text-2xl font-bold text-white py-4">{title}</h1>
      <div className="flex gap-3 overflow-x-scroll pb-4 scrollbar-hide">
        {movies.map((movie) => (
          <MoviesCard key={movie.id} poster_path={movie.poster_path} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;