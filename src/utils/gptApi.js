import { API_OPTIONS, GROQ_KEY } from "./constants";

// Agar "model not found" aaye, to console.groq.com/docs/models se
// current model ka naam yahan daal do.
 const GROQ_MODEL = "openai/gpt-oss-120b";;

// "The Godfather!" aur "the godfather" ko same maanne ke liye
const normalize = (text = "") =>
  text.toLowerCase().replace(/[^a-z0-9]/g, "");

// Line se naam aur saal nikalo: "1. Hera Pheri (2000)"
const parseLine = (line) => {
  const cleaned = line.replace(/^[\s\-*\d.)]+/, "").trim();
  const match = cleaned.match(/^(.*?)\s*\((\d{4})\)\s*$/);
  if (match) return { name: match[1].trim(), year: match[2] };
  return { name: cleaned, year: null };
};

export const getMoviesFromGPT = async (query) => {
  const prompt = `Act as a movie recommendation system. The user query is: "${query}".
If the query is a specific movie title, the FIRST line must be that exact movie, followed by 7 similar movies.
Otherwise suggest 8 movies matching the query.
Return ONLY a list, one movie per line, in exactly this format: Title (Year)
No numbering, no extra text. Example:
Hera Pheri (2000)
Andaz Apna Apna (1994)`;

  // 20 second mein jawab na aaye to request band
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_KEY}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    if (!response.ok) {
      const errBody = await response.text();
      console.error("AI error body:", errBody);
      throw new Error(`AI error ${response.status}`);
    }

    const json = await response.json();
    const text = json.choices?.[0]?.message?.content || "";
    console.log("AI text:", text);

    return text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map(parseLine)
      .filter((m) => m.name);
  } finally {
    clearTimeout(timer);
  }
};

// Ek movie ke liye TMDB mein search, aur sirf relevant results wapas
export const searchMovieTMDB = async ({ name, year }) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        name
      )}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await response.json();

    // poster wali movies hi
    const candidates = (json.results || []).filter((m) => m.poster_path);
    if (candidates.length === 0) return [];

    // naam exact match karne wali movies
    const target = normalize(name);
    const exact = candidates.filter(
      (m) =>
        normalize(m.title) === target || normalize(m.original_title) === target
    );

    // exact na mile to sirf sabse upar wala result
    let pool = exact.length ? exact : [candidates[0]];

    // saal diya ho to usi saal ki movie ko pehle rakho
    if (year) {
      const sameYear = pool.filter((m) => m.release_date?.startsWith(year));
      if (sameYear.length) pool = sameYear;
    }

    return pool.slice(0, year ? 1 : 2);
  } catch (error) {
    console.error("TMDB search error:", error);
    return [];
  }
};