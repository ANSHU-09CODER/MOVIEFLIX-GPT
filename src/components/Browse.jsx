import useNowPlayingMovies from "../Hooks/useNowPlayingMovies";
import Header from "./Headers";
import MainContainer from "./mainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  useNowPlayingMovies();

  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
};

export default Browse;