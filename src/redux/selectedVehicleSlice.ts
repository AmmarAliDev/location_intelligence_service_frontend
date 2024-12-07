import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Vehicle {
  _id: string
  trackerId: number
  carPlate: string
  latitude: number
  longitude: number
  trackerName?: string
}

interface SelectedVehicleState {
  selectedVehicle: Vehicle | null
}

const initialState: SelectedVehicleState = {
  selectedVehicle: null,
}

const selectedVehicleSlice = createSlice({
  name: 'selectedVehicle',
  initialState,
  reducers: {
    setSelectedVehicle: (state, action: PayloadAction<Vehicle | null>) => {
      state.selectedVehicle = action.payload
    },
  },
})

export const { setSelectedVehicle } = selectedVehicleSlice.actions

export default selectedVehicleSlice.reducer
