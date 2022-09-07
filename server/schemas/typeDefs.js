const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  # type PlaylistTest2 {
  #   _id: ID
  #   name: String
  # }
  
  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type Video {
    _id: ID
    name: String
    videoID: String
    image: String
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type Playlist {
    _id: ID
    name: String
    videos: [Video]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
    playlists: [Playlist]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    video(_id: ID!): Video
    playlists: [Playlist]
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addPlaylist(videos: [ID]!): Playlist
    addOrder(products: [ID]!): Order
    updateProduct(_id: ID!, quantity: Int!): Product
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
