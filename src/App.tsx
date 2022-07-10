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
  const [tempPosition, setTempPosition] = useState<LatLngExpression>(null!)
  const [tempName, setTempName] = useState<string>('')

  const initialPosition: LatLngExpression = [51.505, -0.09];


  return (
    <div>
      <h1>react-leaflet demo</h1>
      <hr />
      Person name:
      <input
        type="text"
        value={tempName}
        onChange={(e) => setTempName(e.target.value)}
      />
      <hr />
      Temp position:<textarea value={JSON.stringify(tempPosition, null, 2)} />

      <MapContainer
        center={initialPosition}
        zoom={7}
        scrollWheelZoom={true}
      >

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MyMapContent currentName={tempName} onClick={setTempPosition} />
      </MapContainer>
    </div >
  );
}
interface MyMapContentProps {
  onClick: (position: LatLngExpression) => void;
  currentName: string;//name (from form) to be used when making a new marker
}

function MyMapContent(props: MyMapContentProps) {
  const [personPositions, setPersonPositions] = useState<PersonPosition[]>(teamPositions as PersonPosition[]);
  const map = useMapEvents({
    dblclick(ev) {
      console.log("click event", ev.latlng)
      props.onClick(ev.latlng)
      setPersonPositions(prev => [...prev, { name: props.currentName, latLng: ev.latlng }])
      // map.locate()

    },

    locationfound(e) {
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return <>{
    personPositions.map((personPosition, index) => (
      <PersonLocationMarker personPos={personPosition} />)
    )}
  </>
}

interface PersonLocationMarkerProps {
  personPos: PersonPosition;
}
function PersonLocationMarker(props: PersonLocationMarkerProps) {

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
