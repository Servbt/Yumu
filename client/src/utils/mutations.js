import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
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
  }
`;

export const ADD_PLAYLIST = gql`
  mutation addPlaylist($videos: [ID]!) {
    savePlaylist(videos: $videos) {
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
export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_VIDEO = gql`
  mutation addVideo($videos: [ID]!) {
    saveVideo(videos: $videos) {
    videos {
      _id
      name
      videoID
      image
        }
    }
  }
`;