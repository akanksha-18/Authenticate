import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom'; 
import { MovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

const WatchlistPage = () => {
  const { watchlist } = useContext(MovieContext);
  const { user } = useContext(AuthContext); 
  const navigate = useNavigate(); 

  if (!user) {
    navigate('/login'); 
    return null;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Watchlist</h2>
      <div className="movie-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {watchlist.length > 0 ? (
          watchlist.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))
        ) : (
          <p className="text-gray-500">Your watchlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default WatchlistPage;
