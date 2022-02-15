import { express as voyagerMiddleware } from 'graphql-voyager/middleware'
import { ServerContext } from './context'
import { db } from './db'
import resolvers from './resolvers'
import typeDefs from './schema'
import { ApolloServer } from './server'

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: {
		db: db,
	} as ServerContext,
})

server.express.use('/voyager', voyagerMiddleware({ endpointUrl: '/' }))

server.listen({ port: 4040 }).then(({ url, subscriptionsUrl }) => {
	console.log(`🚀 Server ready at ${url}`)
	console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`)
})
