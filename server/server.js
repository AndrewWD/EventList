const express = require('express')
const graphqlHTTP = require('express-graphql') 
const yelp = require('yelp-fusion')
const path = require('path')
const schema = require('./schema')

const app = express()

app.use('/assets', express.static(path.join(__dirname, '../dist'), { maxAge: 86400000 }))

// apiKey for the yelp api
const apiKey = 'HKpdOBKJ1UzKt9VCQ3UqdhyfIOoApSeEeQWE_5BfDm500BjVMuUqVMrS2jGAaU6uUzqvaNTgP-T_6jsLi36KM_u11NNZnsePk_X20O9vk_1F4QPwKOrFTUZKUGmQXHYx'
const client = yelp.client(apiKey)

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: {
    events: args => 
      client.eventSearch(args).then(res => {
        // Extract the required information from the response data
        const essentialInfos = res.jsonBody.events.map(
          event => {
            const { id, name, time_start, time_end, cost, latitude, longitude, image_url } = event
            return { 
              id,
              name, 
              time_start, 
              time_end, 
              cost,
              location: { latitude, longitude },
              image_url,
            }
          }
        )
        return essentialInfos
      }).catch(e => console.log(e))
  },
  graphiql: process.env.NODE_ENV == 'dev'
}))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`The server started on port ${PORT}`))