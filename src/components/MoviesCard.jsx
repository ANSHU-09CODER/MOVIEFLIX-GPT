import { IMAGE_CDN_URL } from "../utils/constants";

const MoviesCard = ({ poster_path }) => {
  if (!poster_path) return null;

  return (
    <div className="w-36 md:w-48 flex-shrink-0">
      <img
        className="w-full rounded-md hover:scale-105 transition duration-200 cursor-pointer"
        src={IMAGE_CDN_URL + poster_path}
        alt="Movie card"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};

export default MoviesCard;