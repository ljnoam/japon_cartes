import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useEffect, useState } from 'react'

function MapView() {
  const [lieux, setLieux] = useState([])

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(setLieux)
      .catch(err => console.error('Erreur chargement data.json', err))
  }, [])

  return (
    <MapContainer center={[46.6, 1.88]} zoom={6} style={{ height: '80vh', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {lieux.map((lieu, i) => (
        <Marker key={i} position={[lieu.lat, lieu.lon]}>
          <Popup>{lieu.nom}</Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default MapView
