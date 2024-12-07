import axios from 'axios'

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

export const fetchLocation = async (lat: number, lng: number) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          latlng: `${lat},${lng}`,
          key: googleMapsApiKey,
        },
      }
    )
    const address = response.data.results[0]?.formatted_address
    return address
  } catch (error) {
    console.error('Error fetching location:', error)
  }
}
