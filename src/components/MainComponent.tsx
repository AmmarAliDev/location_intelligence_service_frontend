import { useState } from 'react'

import MapComponent from './MapComponent'
import Modal from './Modal'
import VehicleList from './VehicleList'
import VehicleForm from './VehicleForm'

const MainComponent = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Modal isOpen={open} setOpen={setOpen}>
        <VehicleForm setOpen={setOpen} />
      </Modal>
      <div className="vehicle-map-container">
        <VehicleList />
        <MapComponent setOpen={setOpen} />
      </div>
    </>
  )
}
export default MainComponent
