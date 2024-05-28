import React from 'react';

const MovieList = (props) => {
	const FavoriteComponent = props.favoriteComponent;

	return (
		<>
    <div className='row'>
      {props.movies.map((movie, index) => (
        <div className='col-md-4 mb-4' key={movie.imdbID}>
          <div className='image-container d-flex justify-content-start m-3'>
            <img src={movie.Poster} alt='movie' />
            <div
              onClick={() => props.handleFavoritesClick(movie)}
              className='overlay d-flex align-items-center justify-content-center'
            >
              <FavoriteComponent />
            </div>
          </div>
        </div>
      ))}
    </div>
		</>
	);
};

export default MovieList;