export const tmdbFetch = async (path, params = {}) => {
  const qs = new URLSearchParams({ path, ...params }).toString();
  const res = await fetch(`/api/tmdb?${qs}`);
  if (!res.ok) throw new Error(`TMDB error ${res.status}`);
  return res.json();
};