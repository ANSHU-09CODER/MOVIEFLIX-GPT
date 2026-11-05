import useNowPlayingMovies from "../Hooks/useNowPlayingMovies";
import Header from "./Headers";
import MainContainer from "./mainContainer";

const Browse = () => {
  useNowPlayingMovies();

  return (
    <div>
      <Header />
      <MainContainer />
    </div>
  );
};

export default Browse;