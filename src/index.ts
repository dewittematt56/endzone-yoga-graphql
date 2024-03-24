import express from 'express'
import { createYoga } from 'graphql-yoga'
import schema from './graphql/loader' 

const app = express()
 
const yoga = createYoga({ schema  })
 
// Bind GraphQL Yoga to the graphql endpoint to avoid rendering the playground on any path
app.use(yoga.graphqlEndpoint, yoga)
 
app.listen(4000, () => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql')
})