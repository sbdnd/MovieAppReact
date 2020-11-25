import React, { Component } from "react";

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
              <a className="nav-link text-white" href="/">
                home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/">
                favoris
              </a>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}
