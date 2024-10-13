/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { MovieContext } from '../context/MovieContext';

const MovieCard = ({ movie }) => {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useContext(MovieContext);

  const inWatchlist = watchlist.some((m) => m.imdbID === movie.imdbID);

  return (
    <div className="bg-white shadow-lg rounded overflow-hidden w-64 m-4">
      <img src={movie.Poster} alt={movie.Title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{movie.Title} ({movie.Year})</h3>
        <p className="text-gray-600">{movie.Plot}</p>
        {inWatchlist ? (
          <button onClick={() => removeFromWatchlist(movie.imdbID)} className="bg-red-500 text-white p-2 rounded mt-2 hover:bg-red-600 transition">
            Remove from Watchlist
          </button>
        ) : (
          <button onClick={() => addToWatchlist(movie)} className="bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600 transition">
            Add to Watchlist
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
