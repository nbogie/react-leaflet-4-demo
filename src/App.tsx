import React, { useState } from 'react';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import MIcon from './images/marker-icon.png';
import MIcon2X from './images/marker-icon-2x.png';
import MIconShadow from './images/marker-shadow.png';
import * as L from 'leaflet';
import teamPositions from './data/teamPositions.json';
interface PersonPosition {
  name: string;
  latLng: LatLngExpression;
}
export default function Two() {


  const initialPosition: LatLngExpression = [51.505, -0.09];


  return (
    <div>
      <h1>react-leaflet demo</h1>
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
        <MyMapContent />
      </MapContainer>
    </div >
  );
}

function MyMapContent() {
  const [personPositions, setPersonPositions] = useState<PersonPosition[]>(teamPositions as PersonPosition[]);
  const [tempPosition, setTempPosition] = useState<LatLngExpression>(null!)
  const map = useMapEvents({
    dblclick(ev) {
      console.log("click event", ev.latlng)
      setTempPosition(ev.latlng)
      setPersonPositions(prev => [...prev, { name: "new" + new Date(), latLng: ev.latlng }])
      // map.locate()

    },

    locationfound(e) {
      setTempPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return <>{
    personPositions.map((personPosition, index) => (
      <MyLocationMarker personPos={personPosition} />)
    )}
  </>
}

interface MyLocationMarkerProps {
  personPos: PersonPosition;
}
function MyLocationMarker(props: MyLocationMarkerProps) {

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
    <Marker position={props.personPos.latLng} icon={myIcon}>
      <Popup>{props.personPos.name}</Popup>
    </Marker>
  )
}
