import { useEffect, useState } from "react";
const KEY = "317782c8";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("batman");

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setMovies([]); // Clear movies if no results
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Fetch error:", err); // Log errors other than abort
        }
      });

    return () => controller.abort(); // Cleanup function
  }, [query]);

  return (
    <div>
      <h1>Movies</h1>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <tr key={movie.imdbID}>
                <td>{movie.Title}</td>
                <td>{movie.Year}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No movies found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;