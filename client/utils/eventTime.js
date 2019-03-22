import day from 'dayjs'

const eventTime = (startTime, endTime) => {
  const start = day(startTime)
  const end = day(endTime)
  if (!endTime) {
    return `${start.format('MMM D, h:mm A')} - N/A`
  }
  if (start.month() === end.month() && start.date() === end.date()) {
    return `${start.format('MMM D, h:mm A')} - ${end.format('h:mm A')}`
  }
  return `${start.format('MMM D, h:mm A')} - ${end.format('MMM D, h:mm A')}`
}

export default eventTime