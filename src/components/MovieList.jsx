import { useRef } from "react";
import MoviesCard from "./MoviesCard";

const MovieList = ({ title, movies }) => {
  const rowRef = useRef(null);

  if (!movies) return null;

  const scroll = (direction) => {
    const row = rowRef.current;
    if (!row) return;
    // row ki visible width ka 80% scroll karo
    row.scrollBy({
      left: direction * row.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <div className="px-6 md:px-16 group relative">
      <h1 className="text-lg md:text-2xl font-bold text-white py-4">{title}</h1>

      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={() => scroll(-1)}
          aria-label="Scroll left"
          className="hidden md:flex absolute left-0 top-0 bottom-4 z-30 w-12 items-center justify-center bg-black/60 text-white text-3xl opacity-0 group-hover:opacity-100 hover:bg-black/80 transition duration-200"
        >
          ‹
        </button>

        {/* Cards row */}
        <div
          ref={rowRef}
          className="flex gap-3 overflow-x-scroll pb-4 scrollbar-hide scroll-smooth"
        >
          {movies.map((movie) => (
            <MoviesCard key={movie.id} poster_path={movie.poster_path} />
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll(1)}
          aria-label="Scroll right"
          className="hidden md:flex absolute right-0 top-0 bottom-4 z-30 w-12 items-center justify-center bg-black/60 text-white text-3xl opacity-0 group-hover:opacity-100 hover:bg-black/80 transition duration-200"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default MovieList;