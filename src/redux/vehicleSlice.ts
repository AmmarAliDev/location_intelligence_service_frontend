import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface VehicleData {
  trackerId: string
  carPlate: string
  latitude: string
  longitude: string
  trackerName: string
}

const apiUrl = import.meta.env.VITE_API_HOST

export const fetchVehicles = createAsyncThunk(
  'vehicles/fetchVehicles',
  async () => {
    const response = await axios.get(`${apiUrl}/api/vehicles`)
    return response.data
  }
)

// Add vehicle action
export const addVehicle = createAsyncThunk(
  'vehicles/addVehicle',
  async (vehicleData: VehicleData) => {
    try {
      const response = await axios.post(`${apiUrl}/api/vehicles`, vehicleData)
      return response.data
    } catch (error: any) {
      console.error('Error adding vehicle:', error)
      throw new Error(
        `Error: ${
          error?.response
            ? error?.response?.data?.message
            : 'Something went wrong!'
        }`
      )
    }
  }
)

const initialState: VehicleData[] = []

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchVehicles.fulfilled,
      (state, action: PayloadAction<VehicleData[]>) => {
        console.log(state)
        return action.payload
      }
    )
    builder.addCase(
      addVehicle.fulfilled,
      (state, action: PayloadAction<VehicleData>) => {
        state.push(action.payload)
      }
    )
  },
})

export default vehiclesSlice.reducer
