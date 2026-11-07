import { useSelector } from "react-redux";
import useMovieTrailer from "../Hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  useMovieTrailer(movieId);

  const trailerVideo = useSelector((store) => store.movies?.trailerVideos);

  if (!trailerVideo) return <div className="absolute inset-0 bg-black"></div>;

  const key = trailerVideo.key;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
      <iframe
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[max(100vw,177.78vh)] h-[max(56.25vw,100vh)] pointer-events-none"
        src={`https://www.youtube.com/embed/${key}?autoplay=1&mute=1&loop=1&playlist=${key}&controls=0&rel=0&modestbranding=1&playsinline=1`}
        title="Movie trailer"
        allow="autoplay; encrypted-media"
      ></iframe>

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
};

export default VideoBackground;