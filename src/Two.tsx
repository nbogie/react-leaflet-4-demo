import React, { useState } from 'react';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import MIcon from './images/marker-icon.png';
import MIcon2X from './images/marker-icon-2x.png';
import MIconShadow from './images/marker-shadow.png';
import * as L from 'leaflet';

export default function Two() {


  const initialPosition: LatLngExpression = [51.505, -0.09];


  return (
    <div>
      <h1>second demo</h1>

      <hr />
      Here is a map container
      <hr />
      <MapContainer
        center={initialPosition}
        zoom={13}
        scrollWheelZoom={false}

      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MyLocationMarker />
      </MapContainer>
      <hr />
      Above is a map container
    </div >
  );
}

function MyLocationMarker() {
  const [position, setPosition] = useState<L.LatLng>(null!)

  //https://leafletjs.com/reference.html#icon-option
  const myIcon = L.icon({
    iconUrl: MIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 50],
    popupAnchor: [0, -41],
    shadowUrl: MIconShadow,
    shadowSize: [41, 41],
    iconRetinaUrl: MIcon2X,
    shadowAnchor: [22, 41],

  });

  const map = useMapEvents({
    dblclick(ev) {
      console.log("click event", ev)
      setPosition(ev.latlng)
      // map.locate()

    },

    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker position={position} icon={myIcon}>
      <Popup>You are here</Popup>
    </Marker>
  )
}
