/* eslint-disable import/no-anonymous-default-export */
import React from "react";

export default () => {
  return (
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex flex-column justify-content-center align-items-center w-100"
    >
      <h1>Chargement en cours</h1>
      <img
        alt="loading gif "
        src="https://i.pinimg.com/originals/47/54/aa/4754aa786ada71d0f4e04abe911dc6f9.gif"
      />
    </div>
  );
};
