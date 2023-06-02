import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet-rotatedmarker";

import "./css/Map.css";

function MyMap() {
  const altaPosition = [70.0, 23.25];
  const zoomLevel = 12;
  const [position, setPosition] = useState(altaPosition);
  const [angle, setAngle] = useState(0);
  const [speed, setSpeed] = useState(0.0005);
  const [mouseCoords, setMouseCoords] = useState({});
  const [cursorPosition, setCursorPosition] = useState([0, 0]);
  const [bearing, setBearing] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  const markerRef = useRef(null);
  const mapRef = useRef();

  const arrowIconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <path d="M16 2L2 30 16 20 30 30z" fill="#000" />
    </svg>
  `;
  const arrowIcon = L.divIcon({
    className: "arrow-icon",
    html: arrowIconSvg,
    iconSize: [32, 32],
  });

  const calculateBearing = (startLat, startLng, endLat, endLng) => {
    //only set bearing if cursor is far enough away as.

    const startLatRad = startLat * (Math.PI / 180);
    const startLngRad = startLng * (Math.PI / 180);
    const endLatRad = endLat * (Math.PI / 180);
    const endLngRad = endLng * (Math.PI / 180);

    const y = Math.sin(endLngRad - startLngRad) * Math.cos(endLatRad);
    const x =
      Math.cos(startLatRad) * Math.sin(endLatRad) -
      Math.sin(startLatRad) * Math.cos(endLatRad) * Math.cos(endLngRad - startLngRad);

    let bearing = Math.atan2(y, x) * (180 / Math.PI);
    bearing = (bearing + 360) % 360; // Convert to 0-360 degrees range
    return bearing;
  };

  const moveForward = () => {
    const marker = markerRef.current;
    if (!marker)
      return;

    const latlng = marker.getLatLng();
    // const bearing = calculateBearing(latlng.lat, latlng.lng, targetPosition[0], targetPosition[1]);

    marker.setRotationAngle(bearing);
    const distance = speed; // Distance to move forward

    const newLatLng = [
      latlng.lat + distance * Math.cos(bearing * (Math.PI / 180)) / 2,
      latlng.lng + distance * Math.sin(bearing * (Math.PI / 180)),
    ];

    marker.setLatLng(newLatLng);
    setPosition(newLatLng);
  };

  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }
  function PauseOverlay({ isPaused }) {
    if (!isPaused)
      return;
    return (
      <>
        <div style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%", zIndex: "999", backgroundColor: "rgba(255,255,255,0,2)" }}></div>
      </>
    );
  }
  const handleKeyPress = (e) => {
    console.log(e.code);
    switch (e.code) {
      case "Space":
        setIsPaused(!isPaused);
        break;
      default:
        return;
    }
  }

  useEffect(() => {
    window.document.addEventListener('keydown', handleKeyPress);
  }, [isPaused]);

  const handleMouseMove = (e) => {
    const targetLatLng = mapRef.current.mouseEventToLatLng(e.originalEvent);
    console.log(targetLatLng);
  };
  const MapEvents = () => {
    useMapEvents({
      mousemove(e) {
        setBearing(calculateBearing(position[0], position[1], cursorPosition[0], cursorPosition[1]));
        setCursorPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return false;
  }

  useEffect(() => {
    let animationFrameId;
    const frameRate = 60; // Number of frames per second
    const frameDelay = 1000 / frameRate; // Delay between each frame in milliseconds

    const animate = () => {
      if (!isPaused) {
        moveForward(cursorPosition);
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, cursorPosition, position, isPaused]);

  // useEffect(() => {

  // }, [])

  return (
    <>
      <div>
        x:{cursorPosition[0].toFixed(4)}  y:{cursorPosition[1].toFixed(4)} | {bearing.toFixed(0)}° | zoom: {zoomLevel}
      </div>
      <MapContainer
        ref={mapRef}
        center={position}
        zoom={zoomLevel}
        style={{height: "100%"}}
        onMouseMove={handleMouseMove}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapEvents />
        <ChangeView center={position} zoom={zoomLevel} />
        <Marker position={position} ref={markerRef} />
      </MapContainer>
    </>
  );
}

export default MyMap;
