import { buildSchema } from 'graphql';

// Constructing a schema, using GraphQL schema language
export const schema = buildSchema(`
    type Producer {
      country: String!
      name: String!
      region: String!
    }

    type Product {
      vintage: String!
      name: String!
      producerId: String!
      producer: Producer
    }

    input ProductUpsert {
      vintage: String
      name: String
      producerId: String
      }

    type Query {
      product(_id: String!): Product!
      products(_producerId: String!): [Product!]
    }

    type Mutation {
      deleteProducts(_ids: [String]): Boolean
      updateProduct(_id: String!, input: ProductUpsert): Product
      createProducts(input: [ProductUpsert]): [Product]
      fetchProducts(_url: String!): Boolean
    }
  `);
