import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <header className="navbar navbar-expand-lg navbar-light bg-dark">
        <a className="navbar-brand text-white" href="/">
          Seboflix
        </a>
        <button className="navbar-toggler">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto ">
            <li className="nav-item active ">
              <NavLink
                to="/films"
                className="nav-link text-white"
                activeClassName="active"
              >
                home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/favoris"
                className="nav-link text-white"
                activeClassName="active"
              >
                favoris
              </NavLink>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}
