import React, {Fragment} from 'react'
import styles from '../styles/EventDetail.module.css'
import eventTime from '../utils/eventTime';

const EventDetail = ({ location }) => {
  const event = location.state
  return (
    <Fragment>
      <h1 className={styles.title}>{event.name}</h1>
      <div className={styles.eventContainer}>
        <div className={styles.eventBody}>
          <div className={styles.imgContainer} style={{
            backgroundImage: `url(${event.image_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} />
          <div className={styles.detailContainer}>
            <div>
              <strong>Time</strong>: {eventTime(event.time_start, event.time_end)}
            </div>
            <div>
              <strong>Cost</strong>: {!event.cost ? 'N/A' : `$${event.cost}`}
            </div>
            <div>
              <strong>Distance</strong>: {event.distance ? event.distance.toPrecision(3) + ' miles' : '-'}
            </div>
          </div>
        </div>
        <div className={styles.mapArea}>
          fds
        </div>
      </div>
    </Fragment>
  )
}

export default EventDetail