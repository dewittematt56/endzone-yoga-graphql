import express from 'express'
import { createYoga } from 'graphql-yoga'
import schema from './graphql/loader' 
import { useResponseCache } from '@envelop/response-cache'

const app = express()

const yoga = createYoga({ 
  schema: schema,  
  plugins: [
      useResponseCache({
        session: () => null,
        ttl: 3600000 // Time To Live for Cache -- 1 hour
      })
  ]
})
 
app.use(yoga.graphqlEndpoint, yoga)
 
app.listen(4000, () => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql')
})