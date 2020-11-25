import React, { Component } from "react";
import {
  Header,
  MovieDetails,
  MovieList,
  Loading,
  SearchBar,
} from "./components";
import apiMovie, { apiMovieMap } from "./conf/api.movie";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      selectedMovie: 0,
      loaded: false,
    };
  }

  /**
   * méthode utilisée par le composant MovieDetails
   * met à jour le selectedMovie en fonction d'un index passé en argument
   * @param {*} index
   */
  updateSelectedMovie = (index) => {
    this.setState({ selectedMovie: index });
  };

  /**
   * appel à l'API tmdb pour obtenir une liste de films
   */
  componentDidMount() {
    apiMovie
      .get("/discover/movie")
      .then((response) => response.data.results)
      .then((moviesApi) => {
        console.log(moviesApi);
        const movies = moviesApi.map(apiMovieMap);
        this.updateMovies(movies);
      })
      .catch((err) => console.log(err));
  }
  /**
   * modifie le state de l'app avec la liste des films
   * @param {*} movies
   */
  updateMovies = (movies) => {
    this.setState({
      movies,
      loaded: true,
    });
  };

  render() {
    return (
      <div className="App d-flex flex-column">
        <Header />
        <SearchBar updateMovies={this.updateMovies} />
        {this.state.loaded ? (
          <div className="d-flex flex-row border flex-fill pt-4 p-2">
            <MovieList
              movies={this.state.movies}
              updateSelectedMovie={this.updateSelectedMovie}
            />
            <MovieDetails movie={this.state.movies[this.state.selectedMovie]} />
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default App;
