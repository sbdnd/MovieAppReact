import React, { Component } from "react";
import Style from "./MovieElement.module.scss";

export default class MovieElement extends Component {
  mouseEnter = () => {
    this.props.updateSelectedMovie(this.props.movie.title);
  };

  render() {
    return (
      <div
        onClick={this.mouseEnter}
        className={"border d-flex flex-row bg-ligth " + Style.container}
      >
        <img width="150" height="200" src={this.props.movie.img} alt="film" />
        <div className="flex-fill d-flex flex-column p-3">
          <h5>{this.props.movie.title}</h5>
          <hr className="w-100" />
          <p className="flex-fill">{this.props.movie.details}</p>
          <div className="d-flex flex-row justify-content-end">
            {this.props.isFavori ? (
              <button
                onClick={() => {
                  this.props.removeFavori(this.props.movie.title);
                }}
                className="btn btn-small btn-danger"
              >
                Remove
              </button>
            ) : (
              <button
                onClick={() => {
                  this.props.addFavori(this.props.movie.title);
                }}
                className="btn btn-small btn-primary"
              >
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
