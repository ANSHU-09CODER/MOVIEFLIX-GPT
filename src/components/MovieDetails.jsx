import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Headers";
import useMovieTrailer from "../Hooks/useMovieTrailer";
import { API_OPTIONS } from "../utils/constants";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  useMovieTrailer(movieId);
  const trailer = useSelector((store) => store.movies?.trailerVideos);

  useEffect(() => {
    setMovie(null);
    setShowInfo(false);
    setShowTrailer(false);

    const getMovie = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          API_OPTIONS
        );
        setMovie(await res.json());
      } catch (error) {
        console.error("Movie details error:", error);
      }
    };
    getMovie();
  }, [movieId]);

  if (!movie) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
      </div>
    );
  }

  const imageUrl = movie.backdrop_path || movie.poster_path;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">
      <Header />

      {/* poore page par poster */}
      {imageUrl && (
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original${imageUrl}`}
          alt={movie.title}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent"></div>

      {/* title + buttons (MainContainer jaisa) */}
      <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-16 pt-24">
        <h1 className="text-3xl md:text-6xl font-extrabold max-w-2xl drop-shadow-lg">
          {movie.title}
        </h1>

        <p className="hidden md:block mt-4 max-w-xl text-lg text-gray-200 leading-relaxed line-clamp-3 drop-shadow-md">
          {movie.overview}
        </p>

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={() => setShowTrailer(true)}
            className="flex items-center gap-2 bg-red-600 text-white font-bold pl-5 pr-7 md:pl-7 md:pr-9 py-2 md:py-3 rounded text-lg md:text-2xl hover:bg-red-700 transition duration-200"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8" fill="currentColor">
              <path d="M6 4l15 8-15 8V4z" />
            </svg>
            Play
          </button>

          <button
            onClick={() => setShowInfo((prev) => !prev)}
            className="flex items-center gap-2 bg-black/60 text-white font-bold pl-6 pr-8 py-2 md:py-3 rounded text-lg md:text-2xl border border-white/40 hover:bg-black/80 hover:border-red-600 transition duration-200"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 md:w-8 md:h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="11" x2="12" y2="17" />
              <circle cx="12" cy="7.5" r="0.6" fill="currentColor" />
            </svg>
            More Info
          </button>
        </div>

        {/* More Info par ye panel dikhega */}
        {showInfo && (
          <div className="mt-6 max-w-xl bg-black/70 border border-white/20 rounded-lg p-4 md:p-5">
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm md:text-base text-gray-300">
              {movie.release_date && <span>📅 {movie.release_date.slice(0, 4)}</span>}
              {movie.runtime > 0 && <span>⏱ {movie.runtime} min</span>}
              {movie.vote_average > 0 && (
                <span>⭐ {movie.vote_average.toFixed(1)}/10</span>
              )}
            </div>

            {movie.genres?.length > 0 && (
              <p className="mt-2 text-red-500 font-semibold text-sm md:text-base">
                {movie.genres.map((g) => g.name).join(" • ")}
              </p>
            )}

            <p className="mt-3 text-gray-200 text-sm md:text-base leading-relaxed">
              {movie.overview || "No description available."}
            </p>
          </div>
        )}
      </div>

      {/* Play dabane par trailer popup */}
      {showTrailer && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setShowTrailer(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-black/70 text-white text-xl hover:bg-red-600 transition"
            >
              ✕
            </button>

            {trailer ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0`}
                title="Movie trailer"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                Trailer available nahi hai.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;