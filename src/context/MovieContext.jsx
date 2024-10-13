import  { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const storedWatchlist = localStorage.getItem(`${user}-watchlist`);
    setWatchlist(storedWatchlist ? JSON.parse(storedWatchlist) : []);
  }, [user]);

  const addToWatchlist = (movie) => {
    const updatedWatchlist = [...watchlist, movie];
    setWatchlist(updatedWatchlist);
    localStorage.setItem(`${user}-watchlist`, JSON.stringify(updatedWatchlist));
  };

  const removeFromWatchlist = (imdbID) => {
    const updatedWatchlist = watchlist.filter((movie) => movie.imdbID !== imdbID);
    setWatchlist(updatedWatchlist);
    localStorage.setItem(`${user}-watchlist`, JSON.stringify(updatedWatchlist));
  };

  return (
    <MovieContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist }}>
      {children}
    </MovieContext.Provider>
  );
};
