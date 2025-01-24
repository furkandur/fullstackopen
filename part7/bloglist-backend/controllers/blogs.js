const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user',
      {
        username: 1,
        name: 1
      }
    )
    .populate('comments', {
      content: 1
    })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  let addedBlog = await blog.save()
  await addedBlog
    .populate('user',
      {
        username: 1,
        name: 1
      }
    )
    .populate('comments', { content: 1 }
    )

  user.blogs = user.blogs.concat(addedBlog._id)
  await user.save()
  response.status(201).json(addedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() !== request.user.id.toString()) {
    return response.status(401).json({ error: 'token invalid' })
  }
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user
  }

  const updatedBlog = await Blog
    .findByIdAndUpdate(
      request.params.id,
      blog,
      { new: true }
    )
    .populate('user',
      {
        username: 1,
        name: 1
      }
    )
    .populate('comments',
      {
        content: 1
      }
    )
  response.json(updatedBlog)
})

blogsRouter.get('/:id/comments', async (request, response) => {
  const blogId = request.params.id
  const comments = await Comment
  .find({ blog: blogId })
  .populate('blog',
    {
      url: 1,
      title: 1,
      author: 1
    }
  )

response.json(comments)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const blogId = request.params.id

  const blog = await Blog.findById(blogId);
  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' });
  }

  const comment = new Comment({
    content: request.body.content,
    blog: blogId
  })
  const addedComment = await comment.save()
  
  blog.comments = blog.comments.concat(addedComment._id)
  await blog.save()

  const updatedBlog = await Blog
    .findById(blogId)
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1 })

  response.status(201).json(updatedBlog)
})

module.exports = blogsRouter