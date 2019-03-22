const express = require('express')
const graphqlHTTP = require('express-graphql') 
const yelp = require('yelp-fusion')
const schema = require('./schema')

const app = express()

// apiKey for the yelp api
const apiKey = 'HKpdOBKJ1UzKt9VCQ3UqdhyfIOoApSeEeQWE_5BfDm500BjVMuUqVMrS2jGAaU6uUzqvaNTgP-T_6jsLi36KM_u11NNZnsePk_X20O9vk_1F4QPwKOrFTUZKUGmQXHYx'
const client = yelp.client(apiKey)

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: {
    events: ({ input }) => 
      client.eventSearch({
        latitude: input.latitude,
        longitude: input.longitude,
        limit: input.limit,
        radius: input.radius,
        start_date: input.start_date,
      }).then(res => {
        // Extract the required information from the response data
        const essentialInfos = res.jsonBody.events.map(
          event => {
            const { latitude, longitude } = event
            const { id, name, time_start, time_end, cost } = event
            return { 
              id,
              name, 
              time_start, 
              time_end, 
              cost,
              location: { latitude, longitude },
            }
          }
        )
        return essentialInfos
      }).catch(e => console.log(e))
  },
  graphiql: process.env.NODE_ENV == 'dev'
}))

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`The server started on port ${PORT}`))