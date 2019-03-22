const { buildSchema } = require('graphql')
 
// Event Schema
const schema = buildSchema(`
  type Location {
    latitude: Float!
    longitude: Float! 
  }

  type Event {
    id: String!
    name: String!
    time_start: String!
    time_end: String
    cost: Float
    location: Location!
  }

  input UserQuery {
    latitude: Float!
    longitude: Float!
    limit: Int!
    start_date: Int!
    radius: Int = 40000
  }

  type RootQuery {
    events(input: UserQuery!): [Event!]!
  }

  schema {
    query: RootQuery
  }
`)

module.exports = schema