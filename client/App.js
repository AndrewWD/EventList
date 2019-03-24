import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { Link, Route, BrowserRouter as Router } from 'react-router-dom'
import Loadable from 'react-loadable'
import styles from './styles/App.module.css'

const Loading = () => (<span />)

const EventList = Loadable({
  loader: () => import(
    /* webpackChunkName: "EventList" */ 
    './components/EventList'),
  loading: Loading,
})

const EventDetail = Loadable({
  loader: () => import(
    /* webpackChunkName: "EventDetail" */
    './components/EventDetail'),
  loading: Loading,
})

class App extends Component {
  state = {
    limit: 10,
  }

  handleLimitChange = limit => {
    this.setState({
      limit,
    })
  }

  render() {
    return (
      <div>
        <Router>
          <nav className={styles.navBar}>
            <ul>
              <li>
                <Link to={{ pathname: "/" }}>YelpEvent</Link>
              </li>
            </ul>
          </nav>
          <div className={styles.Container}>
            <Route 
              path="/" 
              exact 
              render={props => (<EventList {...props} limit={this.state.limit} onLimitChange={this.handleLimitChange} />)} />
            <Route path="/details/:id" component={EventDetail} />
          </div>
        </Router>
      </div>
    )
  }
}

export default hot(module)(App)
