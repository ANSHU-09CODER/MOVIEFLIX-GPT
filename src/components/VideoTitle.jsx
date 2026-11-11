import { Link } from "react-router-dom";

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-8 md:h-8" fill="currentColor">
    <path d="M6 4l15 8-15 8V4z" />
  </svg>
);

const InfoIcon = () => (
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
);

const VideoTitle = ({ title, overview, movieId }) => {
  const moviePath = `/movie/${movieId}`;

  return (
    <div className="relative z-20 h-full flex flex-col justify-end md:justify-center px-4 sm:px-8 md:px-16 pb-16 md:pb-0 md:pt-24 text-white">
      <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold max-w-2xl drop-shadow-lg">
        {title}
      </h1>

      <p className="hidden sm:block mt-3 md:mt-4 max-w-xl text-sm md:text-lg text-gray-200 leading-relaxed line-clamp-2 md:line-clamp-3 drop-shadow-md">
        {overview}
      </p>

      <div className="mt-4 md:mt-6 flex items-center gap-2 md:gap-3">
        <Link
          to={moviePath}
          className="flex items-center gap-2 bg-red-600 text-white font-bold px-4 py-1.5 md:pl-7 md:pr-9 md:py-3 rounded text-base md:text-2xl hover:bg-red-700 transition duration-200"
        >
          <PlayIcon />
          Play
        </Link>

        <Link
          to={moviePath}
          className="flex items-center gap-2 bg-black/60 text-white font-bold px-4 py-1.5 md:pl-6 md:pr-8 md:py-3 rounded text-base md:text-2xl border border-white/40 hover:bg-black/80 hover:border-red-600 transition duration-200"
        >
          <InfoIcon />
          More Info
        </Link>
      </div>
    </div>
  );
};

export default VideoTitle;