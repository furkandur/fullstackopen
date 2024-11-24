import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('Blog Component', () => {
  let container
  const updateBlog = vi.fn()
  const deleteBlog = vi.fn()

  const blog = {
    title: 'Title for test',
    author: 'Test Author',
    url: 'https://www.test.com',
    likes: '12',
    user: {
      username: 'TestUser',
      name: 'TestName'
    }
  }

  const user = {
    username: 'TestUser',
    name: 'TestName'
  }

  beforeEach(() => {
    updateBlog.mockClear()
    deleteBlog.mockClear()

    container = render(
      <Blog
        blog={blog}
        user={user}
        updateBlog={updateBlog}
        deleteBlog={deleteBlog}
      />
    ).container
  })

  test('should renders the blogs title and author, but does not render its URL or number of likes by default', async () => {
    const blogContent = container.querySelector('.blogContent')
    const blogDetails = container.querySelector('.blogDetails')

    expect(blogContent).toBeDefined()
    expect(blogDetails).not.toBeVisible()
  })

  test('should URL and likes are shown when the button has been clicked', async () => {
    const blogDetails = container.querySelector('.blogDetails')

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(blogDetails).toBeVisible()
  })

  test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
    const viewButton = screen.getByText('view')
    const likeButton = screen.getByText('like')

    const user = userEvent.setup()
    await user.click(viewButton)

    await user.click(likeButton)
    await user.click(likeButton)

    expect(updateBlog.mock.calls).toHaveLength(2)

  })
})
