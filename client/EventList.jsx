import  React, { Component } from 'react'
import haversine from 'haversine'
import getCurrentLocation from './utils/getCurrentLocation'
import Event from './Event'

const events = [
  {
    id: 'new-york-hamilton-broadway-musical-deals-march-2019',
    name: 'Hamilton Broadway Musical Deals - March, 2019',
    time_start: '2019-03-01T20:00:00-05:00',
    time_end: '2019-03-31T15:00:00-04:00',
    cost: 293,
    location: {
      latitude: 40.758983,
      longitude: -73.9867219,
    },
  },
  {
    id: 'new-york-sunday-night-jazz-at-the-campbell-10',
    name: 'Sunday Night Jazz at The Campbell',
    time_start: '2019-03-24T18:00:00-04:00',
    time_end: '2019-03-24T22:00:00-04:00',
    cost: null,
    location: {
      latitude: 40.7526347,
      longitude: -73.9774643,
    },
  },
  {
    id: 'new-york-free-friday-night-comedy-show',
    name: 'Free Friday Night Comedy Show',
    time_start: '2019-03-01T19:30:00-05:00',
    time_end: null,
    cost: 25,
    location: {
      latitude: 40.731826,
      longitude: -74.001344,
    },
  },
  {
    id: 'new-york-free-friday-night-comedy',
    name: 'Free Friday Night Comedy Show',
    time_start: '2019-03-01T19:30:00-05:00',
    time_end: null,
    cost: 25,
    location: {
      latitude: 40.731826,
      longitude: -74.001344,
    },
  },

]

class EventList extends Component {
  state = {
    events,
  }

  componentDidMount() {
    this.getPosition()
  }

  getPosition = async () => {
    try {
      const currentLoc = await getCurrentLocation()
      let { events } = this.state
      events = events.map(event => ({
        ...event,
        distance: haversine(currentLoc, event.location, { unit: 'mile' })
      }))
      this.setState({ events })
    } catch (fallbackPos) {
      // this.setState({ currentLoc: fallbackPos })
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
