import { gql } from "@apollo/client"

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    published
    author {
      name
    }
    genres
  }
`

export const ALL_AUTHORS = gql`
  query ALL_AUTHORS {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query ALL_BOOKS ($author: String, $genre: String) {
    allBooks (author: $author, genre: $genre){
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ADD_BOOK = gql`
  mutation ADD_BOOK ($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
        ...BookDetails
      }
  }
  ${BOOK_DETAILS}
`

export const BOOK_ADDED = gql`
  subscription BOOK_ADDED {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const EDIT_AUTHOR = gql`
  mutation EDIT_AUTHOR ($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      bookCount
    }
  } 
`

export const LOGIN = gql`
  mutation LOGIN ($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
  query ME {
    me {
      id
      username
      favoriteGenre
    }
  }
`

export const ALL_GENRES = gql`
  query ALL_GENRES {
    allGenres
  }
`