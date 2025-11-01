import React from "react";

const MovieCard = ({ movie, onSelect }) => {
  return (
    <div className="movie-card" onClick={() => onSelect(movie)}>
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200"}
        alt={movie.Title}
      />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
    </div>
  );
};

export default MovieCard;
