
import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from 'leaflet';
import "leaflet-rotatedmarker";

import "./css/Map.css";



function MyMap() {

  const altaPosition = [70.00, 23.25]
  const zoomLevel = 12;
  const [position, setPosition] = useState([70.00, 23.25]);
  const [angle, setAngle] = useState(0);
  const [speed, setSpeed] = useState(0);

  const markerRef = useRef(null);
  const mapRef = useRef();


  function handleSetView(coordinates) {
    mapRef.current.setView(coordinates);
  }


  const arrowIconSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <path d="M16 2L2 30 16 20 30 30z" fill="#000" />
  </svg>
  `;

  const arrowIcon = L.divIcon({
    className: 'arrow-icon',
    html: arrowIconSvg,
    iconSize: [32, 32],
  });
  useEffect(() => {
    const marker = markerRef.current;
    const handleMouseMove = (e) => {
      const marker = markerRef.current;

      if (marker) {
        const containerPoint = mapRef.current.mouseEventToContainerPoint(e);
        const latLng = mapRef.current.containerPointToLatLng(containerPoint);

        marker.setLatLng(latLng);
        marker.update();
        setPosition([latLng.lat, latLng.lng]);
      }
    };

    
    if (marker) {
      marker.setIcon(arrowIcon);
      marker.setRotationOrigin("center")
    }

    const handleKeyDown = (e) => {
      const marker = markerRef.current;
      if (!marker)
        return;

      switch (e.code) {
        case 'KeyW':
          setSpeed(speed + 5);
          break;
        case 'KeyS':
          setSpeed(speed - 5);
          break;
        case 'KeyA':
          if (angle <= 0)
            setAngle(360);
          else
            setAngle(angle - 5)
          break;
        case 'KeyD':
          if (angle >= 360)
            setAngle(5);
          else
            setAngle(angle + 5)
          break;
        default:
          return;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [angle]);


  const moveForward = () => {
    const marker = markerRef.current;
    const latlng = marker.getLatLng();

    const distance = 0.0001; // Distance to move forward
    marker.setRotationAngle(angle);

    const newLatLng = [
      latlng.lat + distance * Math.cos(angle * Math.PI / 180),
      latlng.lng + distance * Math.sin(angle * Math.PI / 180) * 2
    ];

    marker.setLatLng(newLatLng);
    marker.update();
    handleSetView(newLatLng);
  }

  useEffect(() => {
    let animationFrameId;
    const frameRate = 60; // Number of frames per second
    const frameDelay = 1000 / frameRate; // Delay between each frame in milliseconds

    const animate = () => {
      moveForward();
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [angle]);


  return (
    <MapContainer
      ref={mapRef}
      center={position}
      zoom={zoomLevel}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} ref={markerRef} />
    </MapContainer>
  );
}

export default MyMap;
