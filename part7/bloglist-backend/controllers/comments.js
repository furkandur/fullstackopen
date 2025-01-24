const commentRouter = require('express').Router()
const Comment = require('../models/comment')
const middleware = require('../utils/middleware')

commentRouter.get('/', async (request, response) => {
  const comments = await Comment
    .find({})
    .populate('blogs',
      {
        url: 1,
        title: 1,
        author: 1
      }
    )

  response.json(comments)
})

module.exports = commentRouter