import { configureStore } from '@reduxjs/toolkit'

import vehiclesReducer from './vehicleSlice'
import selectedVehicleReducer from './selectedVehicleSlice'

const store = configureStore({
  reducer: {
    vehicles: vehiclesReducer,
    selectedVehicle: selectedVehicleReducer,
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
