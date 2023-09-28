import { gql } from "@apollo/client"

export const GET_ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
export const GET_ALL_BOOKS = gql`
  query {
    allBooks {
      author {
        name
      }
      published
      title
    }
  }
`
export const ADD_BOOK = gql`
  mutation Mutation(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      genres
      id
      published
    }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      id
      bookCount
    }
  }
`
