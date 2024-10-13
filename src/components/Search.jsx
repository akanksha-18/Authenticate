import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';

const Search = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchDefaultMovies = async () => {
    setLoading(true); 
    try {
      const res = await fetch(`https://www.omdbapi.com/?s=action&apikey=${API_KEY}`);
      const data = await res.json();
      setMovies(data.Search || []);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setLoading(false); 
    }
  };

  const searchMovies = async () => {
    if (query.trim() === '') return;
    setLoading(true);
    try {
      const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
      const data = await res.json();
      setMovies(data.Search || []);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchDefaultMovies();
  }, []);

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Movie Search</h1>

      <div className="flex flex-col md:flex-row md:space-x-4 mb-6 w-full md:w-auto">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:w-80 px-4 py-2 mb-4 md:mb-0 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={searchMovies}
          className="w-full md:w-auto bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Search
        </button>
      </div>

      {loading ? ( 
        <div className="flex items-center justify-center w-full h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-gray-200"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {movies.length > 0 ? (
            movies.slice(0, 10).map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">No movies found. Try searching for something else!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
