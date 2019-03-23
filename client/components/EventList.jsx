import  React, { Component, Fragment } from 'react'
import haversine from 'haversine'
import { request } from 'graphql-request'
import getCurrentLocation from '../utils/getCurrentLocation'
import getStartTime from '../utils/getToday'
import Event from './Event'
import styles from '../styles/EventList.module.css'
import loadingStyles from '../styles/LoadingRing.module.css'

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
      image_url
    }
  }
`

class EventList extends Component {
  state = {
    events: [],
    loading: true,
  }

  componentDidMount() {
    this.loadEvents()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.state.reload) {
      this.setState({
        loading: true
      })
      this.loadEvents()
    }
  }

  loadEvents = async () => {
    try {
      const currentLoc = await getCurrentLocation()
      const today = getStartTime()
      const queryParameters = {
        ...currentLoc,
        start_date: today,
        end_date: today,
        limit: 11,
      }
      let events = await request('/graphql', query, queryParameters)
      events = events.events.map(event => ({
        ...event,
        distance: haversine(currentLoc, event.location, { unit: 'mile' })
      }))
      this.setState({ 
        events,
        loading: false,
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const { events, loading} = this.state
    events.sort((a, b) => a.distance - b.distance)
    return (
      <Fragment>
        <h1>Today's Events</h1>
        {
          loading ? (
            <div className={loadingStyles.loadingRing}></div>
          ) : (
            <div className={styles.eventList}>
              {events.map(event => (
                <Event event={event} key={event.id} />
              ))}
            </div>
          )
        }
      </Fragment> 
    )
  }
}

export default EventList
