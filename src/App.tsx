import React from 'react';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import MIcon from './images/marker-icon.png';
import MIcon2X from './images/marker-icon-2x.png';
import MIconShadow from './images/marker-shadow.png';
import * as L from 'leaflet';

export default function App() {

  // const map = useMapEvents({
  //   click: () => {
  //     console.log("map click")
  //     map.locate()
  //   },
  //   locationfound: (location) => {
  //     console.log('location found:', location)
  //   },
  // })

  const position: LatLngExpression = [51.505, -0.09];

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

  return (
    <div>
      <h1>Hello react-leaflet v4</h1>

      <hr />
      Here is a map container
      <hr />
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}

      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={position}
          icon={myIcon} >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      <hr />
      Above is a map container
    </div >
  );
}
