import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('BlogForm Component', () => {
  const newBlog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'Test Url'
  }

  test('received as props with the right details when a new blog is created', async () => {
    const createBlog = vi.fn()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText('title')
    const authorInput = screen.getByPlaceholderText('author')
    const urlInput = screen.getByPlaceholderText('url')
    const createBlogButton = screen.getByText('create')

    const user = userEvent.setup()
    await user.type(titleInput, newBlog.title)
    await user.type(authorInput, newBlog.author)
    await user.type(urlInput, newBlog.url)
    await user.click(createBlogButton)

    expect(createBlog.mock.calls[0][0]).toStrictEqual(newBlog)
  })
})
