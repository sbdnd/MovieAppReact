/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Loading } from "../../components";
import { FavoriList } from "./components";

export default (props) => {
  return (
    <div className="d-flex flex-row border flex-fill pt-4 p-2">
      {props.loaded ? (
        <div className="d-flex flex-row border flex-fill pt-4 p-2">
          <FavoriList
            favori={props.favoris}
            removeFavori={props.removeFavori}
          />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};
