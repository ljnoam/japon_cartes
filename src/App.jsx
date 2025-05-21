import { useEffect, useState } from 'react'
import { LoadScript } from '@react-google-maps/api'
import VilleMap from './VilleMap'

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

function App() {
  const [grouped, setGrouped] = useState({})

  useEffect(() => {
    fetch('data.json')
      .then(res => res.json())
      .then(data => {
        const group = {}
        data.forEach(hotel => {
          if (!group[hotel.ville]) group[hotel.ville] = []
          group[hotel.ville].push(hotel)
        })
        setGrouped(group)
      })
  }, [])

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <div style={{ padding: '2rem' }}>
        <h1>Carte des lieux (Google Maps)</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
          {Object.entries(grouped).map(([ville, hotels]) => (
            <div key={ville} style={{ width: '500px' }}>
              <h2>{ville}</h2>
              <VilleMap hotels={hotels} />
            </div>
          ))}
        </div>
      </div>
    </LoadScript>
  )
}

export default App
