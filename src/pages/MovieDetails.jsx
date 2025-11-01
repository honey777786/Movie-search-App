import React, { useEffect, useState } from "react";

const API_URL = "https://www.omdbapi.com/?apikey=e1c649c0";

const MovieDetails = ({ movie, onBack }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`${API_URL}&i=${movie.imdbID}&plot=full`);
        const data = await res.json();
        if (data.Response === "True") {
          setDetails(data);
          setError("");
        } else {
          setError("Details not found");
        }
      } catch {
        setError("Failed to fetch details.");
      }
      setLoading(false);
    };
    fetchDetails();
  }, [movie]);

  if (loading) return <p className="loading">Loading details...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="movie-details">
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>
      <div className="details-container">
        <img
          src={
            details.Poster !== "N/A"
              ? details.Poster
              : "https://via.placeholder.com/300"
          }
          alt={details.Title}
        />
        <div className="info">
          <h2>{details.Title}</h2>
          <p><strong>Year:</strong> {details.Year}</p>
          <p><strong>Genre:</strong> {details.Genre}</p>
          <p><strong>Director:</strong> {details.Director}</p>
          <p><strong>Actors:</strong> {details.Actors}</p>
          <p><strong>Plot:</strong> {details.Plot}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
