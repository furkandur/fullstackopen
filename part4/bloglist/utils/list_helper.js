const _ = require('lodash')

const dummy =() => 1

const totalLikes = blogs => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = blogs => {
  const likes = blogs.map(blog => blog.likes)
  const favorite = blogs.find(blog => blog.likes === Math.max(...likes))

  delete favorite._id
  delete favorite.url
  delete favorite.__v

  return favorite
}

const mostBlogs = blogs => {
  const [author, blogsCount] = _(blogs)
    .countBy('author')
    .entries()
    .maxBy(_.last)

  return { author, blogs: blogsCount }
}

const mostLikes = blogs => {
  const authorLikes = _(blogs)
    .groupBy('author')
    .map((authorBlogs, author) => ({
      author: author,
      likes: _.sumBy(authorBlogs, 'likes')
    }))
    .maxBy('likes')

  return authorLikes
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}