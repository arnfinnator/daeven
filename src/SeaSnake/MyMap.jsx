import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./css/Map.css";

function MyMap() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=51.505&lon=-0.09`
      );
      const data = await response.json();
      setLocation(data);
    };

    fetchLocationData();
  }, []);

  return (
    <div>
      <MapContainer
        center={[71.1, 23.09]}
        zoom={13}
        style={{ height: "50vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[70.2, 23.09]} />
        <Popup>
          {location && (
            <div>
              Marker is {location.address.water ? "at sea" : "on land"}.
            </div>
          )}
        </Popup>
      </MapContainer>
    </div>
  );
}

export default MyMap;
