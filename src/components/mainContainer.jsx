import { useMemo } from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import SecondaryContainer from "./SecondaryContainer";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  const mainMovie = useMemo(() => {
    if (!movies || movies.length === 0) return null;
    return movies[Math.floor(Math.random() * movies.length)];
  }, [movies]);

  if (!mainMovie) return null;

  const { original_title, overview, id } = mainMovie;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <VideoBackground movieId={id} />
      <VideoTitle title={original_title} overview={overview} />
      <SecondaryContainer></SecondaryContainer>
    </div>
  );
};

export default MainContainer;