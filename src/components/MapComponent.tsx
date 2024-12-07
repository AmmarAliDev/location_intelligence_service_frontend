import { useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'

import { fetchLocation } from '../services/mapService'
import VehicleDetailsPopup from './VehicleDetailsPopup'

import '../styles/MapComponent.scss'

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const mapId = import.meta.env.VITE_GOOGLE_MAPS_ID

// Default center when no vehicle is selected
const DEFAULT_CENTER = { lat: 25.257384765884733, lng: 55.35874203877398 }

interface Vehicle {
  _id: string
  trackerId: number
  carPlate: string
  latitude: number
  longitude: number
  trackerName: string
}

interface RootState {
  vehicles: Vehicle[]
  selectedVehicle: {
    selectedVehicle: Vehicle | null
  }
}

const MapComponent = ({ setOpen }: { setOpen: (value: boolean) => void }) => {
  const selectedVehicle = useSelector(
    (state: RootState) => state.selectedVehicle.selectedVehicle
  )

  const [address, setAddress] = useState<string>('')
  const mapRef = useRef<google.maps.Map | null>(null)
  const [popupOpen, setPopupOpen] = useState(true)
  const [center, setCenter] = useState(DEFAULT_CENTER)

  useEffect(() => {
    if (selectedVehicle) {
      // Fetch address for selected vehicle
      const getAddress = async () => {
        const fetchedAddress = await fetchLocation(
          selectedVehicle.latitude,
          selectedVehicle.longitude
        )
        setAddress(fetchedAddress || 'Location not found')
      }
      getAddress()

      setCenter({
        lat: selectedVehicle.latitude,
        lng: selectedVehicle.longitude,
      })

      if (mapRef.current) {
        const marker = new google.maps.Marker({
          position: {
            lat: selectedVehicle.latitude,
            lng: selectedVehicle.longitude,
          },
          map: mapRef.current,
          title: selectedVehicle.trackerName,
        })

        marker.addListener('click', () => {
          setPopupOpen(true)
        })

        return () => {
          marker.setMap(null)
        }
      }
    } else {
      setAddress('')
      setCenter(DEFAULT_CENTER)
      setPopupOpen(false)
    }
  }, [selectedVehicle])

  const containerStyle = {
    width: '100%',
    height: '100%',
  }

  return (
    <div className="map-container" style={{ width: '100%' }}>
      {popupOpen && selectedVehicle && (
        <VehicleDetailsPopup
          vehicle={selectedVehicle}
          address={address}
          setOpen={setPopupOpen}
        />
      )}
      <div className="edit-container" onClick={() => setOpen(true)}>
        <img src="/edit-icon.svg" alt="" />
      </div>
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={8}
          onLoad={(map) => {
            mapRef.current = map
          }}
          options={{ mapId }}
        ></GoogleMap>
      </LoadScript>
    </div>
  )
}

export default MapComponent
