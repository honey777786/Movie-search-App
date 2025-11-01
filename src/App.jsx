import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import MovieDetails from "./pages/MovieDetails";

const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=e1c649c0"; 

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchMovies = async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setSelectedMovie(null);

    try {
      const response = await fetch(`${API_URL}&s=${query}`);
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError("No movies found!");
        setMovies([]);
      }
    } catch {
      setError("Something went wrong. Try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>CineScope 🎥</h1>
      <SearchBar onSearch={searchMovies} />
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !selectedMovie && <MovieList movies={movies} onSelect={setSelectedMovie} />}
      {selectedMovie && <MovieDetails movie={selectedMovie} onBack={() => setSelectedMovie(null)} />}
    </div>
  );
};

export default App;
