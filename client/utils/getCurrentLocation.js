// the default location if current location is not available
const fallbackLocation = {
  latitude: 40.7216101,
  longitude: -74.0374355,
}

// time limit for getting location
const timeout = new Promise(resolve => {
  const wait = setTimeout(() => {
    clearTimeout(wait)
    resolve(fallbackLocation)
  }, 5000)
})

const getCurrentLocation = new Promise(resolve => {
  if (navigator && 'geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(pos => {
      const coords = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      }
      console.log('gocha')
      resolve(coords)
    }, () => resolve(fallbackLocation))
  } else {
    resolve(fallbackLocation)
  }
})

export default () => Promise.race([
  timeout, 
  getCurrentLocation
])

