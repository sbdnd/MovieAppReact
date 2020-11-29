import React, { Component } from "react";
import { Header } from "./components";
import apiMovie, { apiMovieMap } from "./conf/api.movie";
import apiFirebase from "./conf/api.firebase";
import Films from "./features/films";
import Favoris from "./features/favoris";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      selectedMovie: 0,
      loaded: false,
      favoris: null,
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
        const movies = moviesApi.map(apiMovieMap);
        this.updateMovies(movies);
      })
      .catch((err) => console.log(err));

    apiFirebase.get("favoris.json").then((response) => {
      let favoris = response.data ? response.data : [];
      this.updateFavori(favoris);
    });
  }
  /**
   * modifie le state de l'app avec la liste des films
   * @param {*} movies
   */
  updateMovies = (movies) => {
    this.setState({
      movies,
      loaded: this.state.favoris ? true : false, //vérifie si la query sur favori a fini et set loaded à true
    });
  };

  updateFavori = (favoris) => {
    this.setState({
      favoris,
      loaded: this.state.movies ? true : false, //vérifie si la query sur movie a fini et set loaded à true
    });
  };

  addFavori = (title) => {
    const favoris = this.state.favoris.slice();
    const film = this.state.movies.find((m) => m.title === title);
    favoris.push(film);
    this.setState({ favoris }, () => {
      this.saveFavori();
    });
  };

  removeFavori = (title) => {
    const favoris = this.state.favoris.slice();
    const index = this.state.favoris.findIndex((f) => f.title === title);
    favoris.splice(index, 1);
    this.setState({ favoris }, () => {
      this.saveFavori();
    });
  };

  saveFavori() {
    apiFirebase.put("favoris.json", this.state.favoris);
  }

  render() {
    return (
      <Router>
        <div className="App d-flex flex-column">
          <Header />
          <Switch>
            <Route
              path="/films"
              render={(props) => {
                return (
                  <Films
                    {...props}
                    updateMovies={this.updateMovies}
                    loaded={this.state.loaded}
                    movies={this.state.movies}
                    updateSelectedMovie={this.updateSelectedMovie}
                    selectedMovie={this.state.selectedMovie}
                    addFavori={this.addFavori}
                    removeFavori={this.removeFavori}
                    favoris={this.state.favoris}
                  />
                );
              }}
            />
            <Route
              path="/favoris"
              render={(props) => {
                return (
                  <Favoris
                    {...props}
                    loaded={this.state.loaded}
                    favoris={this.state.favoris}
                    removeFavori={this.removeFavori}
                  />
                );
              }}
            />
            <Redirect to="/films" />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
