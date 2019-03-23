import React from 'react'
import eventTime from './utils/eventTime'
import './styles/Event.css'

const Event = props => {
  const { event } = props
  return (
    <div className="col-12 col-md-6 mt-4" key={event.id}>
      <div className="card event-body">
        <div className="card-body">
          <div className="card-title title-container">
            <h5>{event.name}</h5>
          </div>
          <div><strong>Time</strong>: {eventTime(event.time_start, event.time_end)}</div>
          <div><strong>Cost</strong>: {!event.cost ? 'N/A' : `$${event.cost}`}</div>
          <div><strong>Distance</strong>: {event.distance ? event.distance.toPrecision(3) + ' miles' : '-'}</div>
        </div>
      </div>
    </div>
  )
}

export default Event