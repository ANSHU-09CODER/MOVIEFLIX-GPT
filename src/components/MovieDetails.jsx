import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Headers";
import useMovieTrailer from "../Hooks/useMovieTrailer";

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
        const res = await fetch(`/api/tmdb?path=movie/${movieId}`);
        if (!res.ok) throw new Error(`TMDB ${res.status}`);
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
    <div className="relative w-full min-h-screen bg-black text-white">
      <Header />

      {imageUrl && (
        <img
          className="fixed inset-0 w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original${imageUrl}`}
          alt={movie.title}
        />
      )}
      <div className="fixed inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent"></div>
      <div className="fixed bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent"></div>

      <div className="relative z-20 min-h-screen flex flex-col justify-end md:justify-center px-4 sm:px-8 md:px-16 pt-24 pb-10 md:pb-0">
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold max-w-2xl drop-shadow-lg">
          {movie.title}
        </h1>

        <p className="mt-3 md:mt-4 max-w-xl text-sm md:text-lg text-gray-200 leading-relaxed line-clamp-3 drop-shadow-md">
          {movie.overview}
        </p>

        <div className="mt-4 md:mt-6 flex items-center gap-2 md:gap-3">
          <button
            onClick={() => setShowTrailer(true)}
            className="flex items-center gap-2 bg-red-600 text-white font-bold px-4 py-1.5 md:pl-7 md:pr-9 md:py-3 rounded text-base md:text-2xl hover:bg-red-700 transition duration-200"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-8 md:h-8" fill="currentColor">
              <path d="M6 4l15 8-15 8V4z" />
            </svg>
            Play
          </button>

          <button
            onClick={() => setShowInfo((prev) => !prev)}
            className="flex items-center gap-2 bg-black/60 text-white font-bold px-4 py-1.5 md:pl-6 md:pr-8 md:py-3 rounded text-base md:text-2xl border border-white/40 hover:bg-black/80 hover:border-red-600 transition duration-200"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 md:w-8 md:h-8"
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

        {showInfo && (
          <div className="mt-4 md:mt-6 w-full md:max-w-xl bg-black/70 border border-white/20 rounded-lg p-3 md:p-5">
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

      {showTrailer && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-2 md:p-4"
          onClick={() => setShowTrailer(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-2 right-2 md:top-3 md:right-3 z-10 w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/70 text-white text-lg md:text-xl hover:bg-red-600 transition"
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
                Trailer not available.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;