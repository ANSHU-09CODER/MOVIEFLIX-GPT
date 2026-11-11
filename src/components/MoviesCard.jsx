import { Link } from "react-router-dom";
import { IMAGE_CDN_URL } from "../utils/constants";

const MoviesCard = ({ id, poster_path }) => {
  if (!poster_path) return null;

  return (
    <Link to={`/movie/${id}`} className="w-28 sm:w-36 md:w-44 lg:w-48 flex-shrink-0"> <img
      className="w-full rounded-md hover:scale-105 transition duration-200 cursor-pointer"
      src={IMAGE_CDN_URL + poster_path}
      alt="Movie card"
      loading="lazy"
    />
    </Link>
  );
};

export default MoviesCard;