import { useState } from 'react'
import { useSelector } from 'react-redux'

import VehicleItem from './VehicleItem'

import '../styles/VehicleList.scss'

interface Vehicle {
  _id: string
  trackerId: number
  carPlate: string
  latitude: number
  longitude: number
  trackerName?: string
}

interface RootState {
  vehicles: Vehicle[]
  selectedVehicle: {
    selectedVehicle: Vehicle | null
  }
}

const VehicleList = () => {
  const vehicles = useSelector((state: RootState) => state.vehicles)
  const [searchTerm, setSearchTerm] = useState('')
  const { selectedVehicle } = useSelector(
    (state: RootState) => state.selectedVehicle
  )

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      (vehicle.trackerName ?? '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      vehicle.carPlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.trackerId.toString().includes(searchTerm)
  )

  return (
    <div className="vehicle-list">
      <div className="class-list-input-container">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul>
        {selectedVehicle && (
          <VehicleItem
            key={selectedVehicle.carPlate}
            vehicle={selectedVehicle}
            styles={{ backgroundColor: '#f5f7f8' }}
          />
        )}
        {filteredVehicles
          .filter((vehicle) => vehicle._id !== selectedVehicle?._id)
          .map((vehicle: Vehicle) => (
            <VehicleItem key={vehicle.carPlate} vehicle={vehicle} />
          ))}
      </ul>
    </div>
  )
}

export default VehicleList
