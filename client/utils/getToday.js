export default () => {
  const currentTime = Date.now() - 3600 * 4 * 1000
  return (currentTime - currentTime % 86400000) / 1000
}