import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Header from "./Headers";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { getMoviesFromGPT, searchMovieTMDB } from "../utils/gptApi";
import { addGptMovieResult, clearGptMovieResult } from "../utils/movieSlice";

const GptSearch = () => {
  const dispatch = useDispatch();
  const searchText = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // page chhodte waqt purane results hata do
  useEffect(() => {
    return () => dispatch(clearGptMovieResult());
  }, [dispatch]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = searchText.current.value.trim();
    if (!query) return;

    setLoading(true);
    setError(null);
    dispatch(clearGptMovieResult());

    try {
      // 1. GPT se movie names (saal ke saath)
      const movies = await getMoviesFromGPT(query);

      // 2. Har movie ko TMDB mein dhundo (parallel)
      const tmdbResults = await Promise.all(movies.map(searchMovieTMDB));

      // 3. Ek list banao aur duplicate hatao
      const unique = tmdbResults
        .flat()
        .filter((m, i, self) => i === self.findIndex((x) => x.id === m.id));

      // 4. Redux store mein daalo
      dispatch(
        addGptMovieResult({
          names: movies.map((m) => m.name),
          results: unique,
        })
      );
    } 
catch (err) {
  console.error("GPT search error:", err);
  if (err.name === "AbortError") {
    setError("The AI took too long to respond. Please try again.");
  } else if (err.message.includes("429")) {
    setError("AI rate limit reached. Please try again in a minute.");
  } else if (err.message.includes("401") || err.message.includes("403")) {
    setError("Invalid or unauthorized AI API key.");
  } else if (err.message.includes("404") || err.message.includes("400")) {
    setError("AI model not found. Check the model name in gptApi.js.");
  } else {
    setError("Search failed. Please check your internet connection or VPN.");
  }
}
    finally {
      setLoading(false);
    }
  };

  return (
  <div className="relative min-h-screen w-full bg-black overflow-x-hidden">
    {/* background image (negative z-index nahi) */}
    <div className="fixed inset-0 z-0">
      <img
        className="w-full h-full object-cover"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/29195c81-5ebb-453e-82e9-d3a50737dfb3/web/IN-en-20261026-TRIFECTA-perspective_ef561213-292c-4768-aef0-c1db800e385e_large.jpg"
        alt=""
      />
      <div className="absolute inset-0 bg-black/60"></div>
    </div>

    <Header />

    {/* content image ke upar */}
    <div className="relative z-10 pt-[16vh] sm:pt-[20vh] md:pt-[25vh] px-4 pb-10 flex flex-col items-center">
      <h1 className="text-white text-2xl sm:text-3xl md:text-5xl font-extrabold text-center">
        What do you want to watch?
      </h1>
      <p className="mt-3 text-sm md:text-base text-gray-300 text-center">
        Describe a mood, genre or story, and AI will suggest movies.
      </p>

      <form
        onSubmit={handleSearch}
        className="mt-6 md:mt-8 w-full max-w-2xl flex flex-col sm:flex-row gap-3 bg-black/70 p-3 rounded-lg border border-white/20"
      >
        <input
          ref={searchText}
          type="text"
          placeholder="e.g. indian funny movies"
          className="flex-1 p-3 bg-gray-700/80 text-white rounded-md outline-none border border-gray-500 focus:border-white"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-md transition duration-200"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && (
        <p className="mt-4 text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded px-3 py-2">
          {error}
        </p>
      )}

      <GptMovieSuggestions />
    </div>
  </div>
);
};

export default GptSearch;