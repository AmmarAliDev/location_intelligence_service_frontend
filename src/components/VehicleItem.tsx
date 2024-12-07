import { useDispatch } from 'react-redux'
import { setSelectedVehicle } from '../redux/selectedVehicleSlice'

interface Vehicle {
  _id: string
  trackerId: number
  trackerName?: string
  carPlate: string
  latitude: number
  longitude: number
}

const VehicleItem = ({
  vehicle,
  styles,
}: {
  vehicle: Vehicle
  styles?: any
}) => {
  const dispatch = useDispatch()
  return (
    <li
      className="vehicle-item"
      style={styles}
      onClick={() => {
        dispatch(setSelectedVehicle(vehicle))
      }}
    >
      <span>{vehicle.trackerName}</span> <span>{vehicle.carPlate}</span>
      <span>{vehicle.trackerId}</span>
    </li>
  )
}

export default VehicleItem
