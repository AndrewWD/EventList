import React, {Fragment} from 'react'
import styles from '../styles/EventDetail.module.css'

const EventDetail = ({ location }) => (
  <Fragment>
    <h1>{location.state.name}</h1>
    <div className={styles.eventContainer}>
      fsdfs
    </div>
  </Fragment>
)

export default EventDetail