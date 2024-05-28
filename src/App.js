//Adding comment for just checking
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavorites from './components/AddFavorites';
import RemoveFavorites from './components/RemoveFavorites';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favorites, setFavorites] = useState([]);

  const getMovieRequest = async (searchValue) => {
    let url;
    let options = {};

    if (searchValue) {
      url = 'https://movielistingbackend.azurewebsites.net/search';
      options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ movie: searchValue }),
      };
    } else {
      url = 'https://www.omdbapi.com/?s=star&apikey=8a72f225&page=1';
    }

    const response = await fetch(url, options);
    const responseJson = await response.json();

    if (responseJson && responseJson.length) {
      setMovies(responseJson.slice(0, 10)); // Ensuring only 10 movies are displayed
    } else if (responseJson.Search) {
      setMovies(responseJson.Search.slice(0, 10)); // Ensuring only 10 movies are displayed
    }
  };

  useEffect(() => {
    getMovieRequest('');
  }, []);

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);


	const addFavoriteMovie = (movie) => {
		const newFavoriteList = [...favorites, movie];
		setFavorites(newFavoriteList);
	};

	const removeFavoriteMovie = (movie) => {
		const newFavoriteList = favorites.filter(
			(favorite) => favorite.imdbID !== movie.imdbID
		);

		setFavorites(newFavoriteList);
	};

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        <MovieList
          movies={movies}
          handleFavoritesClick={addFavoriteMovie}
          favoriteComponent={AddFavorites}
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favorites' />
      </div>
      <div className='row'>
        <MovieList
          movies={favorites}
          handleFavoritesClick={removeFavoriteMovie}
          favoriteComponent={RemoveFavorites}
        />
      </div>
    </div>

	);
};

export default App;