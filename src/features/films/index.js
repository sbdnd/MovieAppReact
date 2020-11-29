/* eslint-disable import/no-anonymous-default-export */

import React, { Fragment } from "react";
import { Loading } from "../../components";
import { MovieDetails, MovieList, SearchBar } from "./components";

export default (props) => {
  return (
    <>
      <SearchBar updateMovies={props.updateMovies} />
      {props.loaded ? (
        <div className="d-flex flex-row border flex-fill pt-4 p-2">
          <MovieList
            movies={props.movies}
            updateSelectedMovie={props.updateSelectedMovie}
            favoris={props.favoris.map((f) => f.title)}
            addFavori={props.addFavori}
            removeFavori={props.removeFavori}
          />
          <MovieDetails movie={props.movies[props.selectedMovie]} />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};
