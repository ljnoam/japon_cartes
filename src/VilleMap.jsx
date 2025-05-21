import { GoogleMap, Marker } from '@react-google-maps/api'
import { useRef, useCallback, useState } from 'react'

const containerStyle = {
  width: '100%',
  height: '300px',
}

function VilleMap({ hotels }) {
  const mapRef = useRef(null)
  const [selectedHotel, setSelectedHotel] = useState(null)

  const onLoad = useCallback((map) => {
    mapRef.current = map
    const bounds = new window.google.maps.LatLngBounds()
    hotels.forEach(h => bounds.extend({ lat: h.lat, lng: h.lon }))
    map.fitBounds(bounds)
  }, [hotels])

  return (
    <>
      <div className="map-wrapper">
        <GoogleMap
          mapContainerStyle={containerStyle}
          onLoad={onLoad}
          options={{ disableDefaultUI: true }}
        >
          {hotels.map((h, i) => (
            <Marker
              key={i}
              position={{ lat: h.lat, lng: h.lon }}
              onClick={() => setSelectedHotel(h.hotel)}
            />
          ))}
        </GoogleMap>
      </div>
      {selectedHotel && (
        <div className="selected-hotel">
          🏨 Hôtel sélectionné : {selectedHotel}
        </div>
      )}
    </>
  )
}

export default VilleMap
