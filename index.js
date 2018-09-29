const { ApolloServer } = require('apollo-server')

const jays = require('./jays.json')

const typeDefs = `
    type Jay {
        id: ID!
        name: String!
        profession: String!
        fullJay: Boolean
    }

    type Query {
        allJays: [Jay!]!
        Jay(id: ID!): Jay!
    }
`

const resolvers = {
    Query: {
        allJays: () => jays,
        Jay: (parent, { id }) => {
            return jays.find(j => j.id === id)
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server
    .listen()
    .then(({ url }) => console.log(`Server running at ${url}`))