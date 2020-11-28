import React, { Component } from "react";
import { Header } from "./components";
import apiMovie, { apiMovieMap } from "./conf/api.movie";
import Films from "./features/films";
import Favoris from "./features/favoris/components";
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
      favoris: [],
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

  addFavori = (title) => {
    const favoris = this.state.favoris.slice();
    const film = this.state.movies.find((m) => m.title === title);
    favoris.push(film);
    this.setState({ favoris });
  };

  removeFavori = (title) => {
    const favoris = this.state.favoris.slice();
    const index = this.state.favoris.findIndex((f) => f.title === title);
    favoris.splice(index, 1);
    this.setState({ favoris });
  };

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
                    favoris={this.state.favoris.map((f) => f.title)}
                  />
                );
              }}
            />
            <Route path="/favoris" component={Favoris} />
            <Redirect to="/films" />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
