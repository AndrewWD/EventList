import  React, { Component } from 'react'
import haversine from 'haversine'
import { request } from 'graphql-request'
import getCurrentLocation from './utils/getCurrentLocation'
import getStartTime from './utils/getToday'
import Event from './Event'

const query = `
  query getEvent($latitude: Float!, $longitude: Float!, $limit: Int!, $start_date: Int!, $end_date: Int!, $radius: Int) {
    events(latitude: $latitude, longitude: $longitude, limit: $limit, start_date: $start_date, end_date: $end_date, radius: $radius) {
      id
      name
      time_start
      time_end
      cost
      location {
        latitude
        longitude
      } 
    }
  }
`

class EventList extends Component {
  state = {
    events: []
  }

  componentDidMount() {
    this.loadEvents()
  }

  loadEvents = async () => {
    try {
      const currentLoc = await getCurrentLocation()
      const today = getStartTime()
      const queryParameters = {
        ...currentLoc,
        start_date: today,
        end_date: today,
        limit: 10,
      }
      let events = await request('/graphql', query, queryParameters)
      events = events.events.map(event => ({
        ...event,
        distance: haversine(currentLoc, event.location, { unit: 'mile' })
      }))
      this.setState({ events })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const { events } = this.state
    events.sort((a, b) => a.distance - b.distance)
    return (
      <div className="row">
        {events.map(event => (
          <Event event={event} key={event.id} />
        ))}
      </div>
    )
  }
}

export default EventList
