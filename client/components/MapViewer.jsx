import React from 'react'
import PropTypes from 'prop-types'
import { Map, Marker, TileLayer } from 'react-leaflet'

const MapViewer = ({ location }) => (
  <Map center={location} zoom={15}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    />
    <Marker position={location} />
  </Map>
)

MapViewer.propTypes = {
  location: PropTypes.array,
}

export default MapViewer 