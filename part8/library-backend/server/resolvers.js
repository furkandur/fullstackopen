const Author = require('../schemas/author')
const Book = require('../schemas/book')
const User = require('../schemas/user')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, { author, genre }) => {
      const filters = {}
      
      if (author) {
        const foundAuthor = await Author.findOne({ name: author })
        if (foundAuthor) filters.author = foundAuthor._id
      }
      if (genre) filters.genres = genre

      return Book.find(filters)
    },
    allAuthors: async () => Author.find({}),
    allGenres: async () => {
      const books = await Book.find({})
      const allGenres = [...new Set(books.flatMap((book) => book.genres))]
      return allGenres
    },
    me: (root, args, context) => context.currentUser
  },
  Book: {
    author: async (root) => Author.findOne({ _id: root.author })
  },
  Author: {
    bookCount: async (root) => {
      const foundBooks = await Book.find({ author: root._id  })
      return foundBooks.length
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      let foundAuthor = await Author.findOne({ name: args.author })

      if (!foundAuthor) {
        const newAuthor = new Author({
          name: args.author,
          born: null,
          bookCount: 1
        })
        
        try {
          foundAuthor = await newAuthor.save()
        } catch (error) {
          throw new GraphQLError('Creating author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          })
        }
      }

      const book = new Book({ ...args, author: foundAuthor._id })

      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }

      return book
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      try {
        const updatedAuthor = await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo },
          { new: true }
        )

        return updatedAuthor
      } catch (error) {
        throw new GraphQLError('Editing author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.setBornTo,
            error
          }
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })

      try {
        await user.save()
      } catch (error) {
        throw new GraphQLError('Creating user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error
          }
        })
      }

      return user
    },
    login: async (root, { username, password }) => {
      const user = await User.findOne({ username: username })

      if (!user || password !== 'secret') {
        throw new GraphQLError('Wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      const userForToken = {
        id: user.id,
        username: user.username
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  }
}

module.exports = resolvers