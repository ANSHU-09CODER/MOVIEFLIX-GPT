const PlayIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8" fill="currentColor">
    <path d="M6 4l15 8-15 8V4z" />
  </svg>
);

const InfoIcon = () => (
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
);

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-16 pt-24 text-white">
      <h1 className="text-3xl md:text-6xl font-extrabold max-w-2xl drop-shadow-lg">
        {title}
      </h1>

      <p className="hidden md:block mt-4 max-w-xl text-lg text-gray-200 leading-relaxed line-clamp-3 drop-shadow-md">
        {overview}
      </p>

      <div className="mt-6 flex items-center gap-3">
        <button className="flex items-center gap-2 bg-red-600 text-white font-bold pl-5 pr-7 md:pl-7 md:pr-9 py-2 md:py-3 rounded text-lg md:text-2xl hover:bg-red-700 transition duration-200">
          <PlayIcon />
          Play
        </button>

        <button className="hidden md:flex items-center gap-2 bg-black/60 text-white font-bold pl-6 pr-8 py-3 rounded text-2xl border border-white/40 hover:bg-black/80 hover:border-red-600 transition duration-200">
          <InfoIcon />
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;