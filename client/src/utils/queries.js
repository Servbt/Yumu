import { gql } from '@apollo/client';

// export const QUERY_PRODUCTS = gql`
//   query getProducts($category: ID) {
//     products(category: $category) {
//       _id
//       name
//       description
//       price
//       quantity
//       image
//       category {
//         _id
//       }
//     }
//   }
// `;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;


export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
  user {
    _id
    firstName
    lastName
    email
    orders {
      _id
      purchaseDate
      products {
        _id
        name
        description
        image
        quantity
        price
      }
    }
    playlists {
      _id
      owner
      name
      videos {
        _id
        name
        videoID
        image
      }
    }
  }
  }
`;


export const QUERY_ALL_PLAYLISTS = gql`
{
  playlists {
    _id
    owner
    name
    videos {
      _id
      name
      videoID
      image
    }
  }
}
`

export const QUERY_VIDEOS = gql`
  query getVideos($category: ID) {
    video(_id: $id) {
    _id
    name
    videoID
    image
  }
  }
`;