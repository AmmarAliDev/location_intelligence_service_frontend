import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { fetchVehicles } from './redux/vehicleSlice'
import MainComponent from './components/MainComponent'

import './styles/App.scss'

function App() {
  const dispatch: any = useDispatch()

  useEffect(() => {
    dispatch(fetchVehicles())
  }, [dispatch])
  return (
    <div className="App">
      <MainComponent />
    </div>
  )
}

export default App
