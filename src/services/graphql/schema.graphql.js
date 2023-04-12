const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: {
        hello: {
          type: GraphQLString,
          resolve: () => 'world',
        },
      },
    }),
  });

module.exports = schema;