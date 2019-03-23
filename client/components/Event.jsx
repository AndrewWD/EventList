import React from 'react'
import { Link } from 'react-router-dom'
import eventTime from '../utils/eventTime'
import '../styles/Event.css'

const Event = ({ event }) => {
  return (
    <div className="event-body" key={event.id}>
      <div className="title-container">
        <h2>{event.name}</h2>
      </div>
      <div><strong>Time</strong>: {eventTime(event.time_start, event.time_end)}</div>
      <div><strong>Cost</strong>: {!event.cost ? 'N/A' : `$${event.cost}`}</div>
      <div><strong>Distance</strong>: {event.distance ? event.distance.toPrecision(3) + ' miles' : '-'}</div>
      <Link to={{
        pathname: `/details/${event.id}`,
        state: event,
      }}>
        <button className="detail-button">
          Detail
        </button>
      </Link>
    </div>
  )
}

export default Event