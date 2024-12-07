import '../styles/VehicleDetailsPopup.scss'

interface Vehicle {
  _id: string
  trackerId: number
  carPlate: string
  latitude: number
  longitude: number
  trackerName?: string
}

const VehicleDetailsPopup = ({
  vehicle,
  address,
  setOpen,
}: {
  vehicle: Vehicle
  address: string
  setOpen: any
}) => {
  return (
    <div className="vehicle-details-popup">
      <button className="cross-button" onClick={() => setOpen(false)}>
        x
      </button>
      <h5>{vehicle?.trackerName}</h5>
      <p>{address}</p>
    </div>
  )
}

export default VehicleDetailsPopup
