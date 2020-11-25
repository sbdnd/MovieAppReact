// @ts-nocheck
import React, { Component } from "react";
import { Formik } from "formik";
import apiMovie, { apiMovieMap } from "../../conf/api.movie";

export default class SearchBar extends Component {
  /**
   * Soumission des valeurs passées en paramètre dans la barre de recherche
   * @param {*} values
   * @param {*} actions
   */
  submit = (values, actions) => {
    //appel le endpoint de recherche d'un film
    const queryString =
      "?" +
      Object.keys(values)
        .map((k) => `${k}=${values[k]}&`)
        .join("");
    apiMovie
      .get("/search/movie" + queryString)
      .then((response) => response.data.results)
      .then((moviesApi) => {
        console.log(moviesApi);
        const movies = moviesApi.map(apiMovieMap);
        this.props.updateMovies(movies);
        actions.setSubmitting(false);
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <Formik
        onSubmit={this.submit}
        initialValues={{ query: "", language: "en-US" }}
      >
        {({ handleSubmit, handleChange, handleBlur, isSubmitting }) => (
          <form
            className="d-flex flex-row align-items-center p-2 m-2"
            onSubmit={handleSubmit}
          >
            <select
              className="mr-2 form-control-sm"
              name="language"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="en-US">Anglais</option>
              <option value="fr-FR">Français</option>
            </select>
            <input
              name="query"
              className="flex-fill form-control mr-2"
              placeholder="search..."
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <button
              className="btn btn-small btn-warning"
              type="submit"
              disabled={isSubmitting}
            >
              Rechercher
            </button>
          </form>
        )}
      </Formik>
    );
  }
}
