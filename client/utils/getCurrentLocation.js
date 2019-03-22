// the default location if current location is not available
const fallbackLocation = {
  latitude: 40.7216101,
  longitude: -74.0374355,
}

const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        const coords = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }
        resolve(coords)
      }, () => reject(fallbackLocation))
    } else {
      reject(fallbackLocation)
    }
  })
}

export default getCurrentLocation

