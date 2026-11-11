module.exports = async (req, res) => {
  const { path = "", ...query } = req.query;

  // abhi sirf popular movies allowed, baad mein baaki add karenge
  if (path !== "movie/popular") {
    return res.status(400).json({ error: "Path not allowed" });
  }

  const params = new URLSearchParams(query).toString();
  const url = `https://api.themoviedb.org/3/${path}${params ? "?" + params : ""}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        accept: "application/json",
      },
    });
    const data = await response.json();
    res.status(response.status).json(data);
  }  catch (error) {
    console.error("TMDB proxy error:", error, error.cause);
    res.status(500).json({
      error: "Failed to fetch from TMDB",
      detail: String(error.cause?.code || error.message),
    });
  }
  
};