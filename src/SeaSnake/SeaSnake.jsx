import React, { useEffect, useRef } from "react";
import "./css/SeaSnake.css";

import MyMap from "./MyMap";
import "./css/Map.css";

const SeaSnake = () => {
  return (
    <>
      <div className="GameBanner">
        <h1>
          SeaSnake{" "}
          <span
            style={{
              fontSize: "3.4rem",
              verticalAlign: "middle",
            }}
            className="material-symbols-outlined"
          >
            sports_esports
          </span>
        </h1>
      </div>
      <div className="mapContainer">
        <MyMap></MyMap>
      </div>
    </>
  );
};

export default SeaSnake;
