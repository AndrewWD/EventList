import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { Link, Route, BrowserRouter as Router } from 'react-router-dom'
import EventList from './components/EventList'
import EventDetail from './components/EventDetail'
import './styles/App.css'

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <nav className="nav-bar">
            <ul>
              <li>
                <Link to={{
                  pathname: "/",
                  state: { reload: true }
                }}>YelpEvent</Link>
              </li>
            </ul>
          </nav>
          <div className="container">
            <Route path="/" exact component={EventList} />
            <Route path="/details/:id" component={EventDetail} />
          </div>
        </Router>
        
      </div>
      
    )
  }
}

export default hot(module)(App)
