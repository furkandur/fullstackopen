const { test, describe, beforeEach, expect } = require("@playwright/test")
const { users, blogs, loginWith, createBlog, expectNotificationToContain, elementClicker } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request}) => {
    await request.post('/api/testing/reset')

    for (const user of users) {
      await request.post('/api/users', { data: user })
    }
    
    const loginResponse = await request.post('/api/login', { data: users[0] })
    const loginData = await loginResponse.json()

    for (const blog of blogs) {
      await request.post('/api/blogs',
        {
          headers: { Authorization: `Bearer ${loginData.token}` },
          data: blog
        }
      )
    }
    page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const loginText = page.getByText('log in to application')
    const username = page.getByTestId('username')
    const password = page.getByTestId('password')
    
    await expect(loginText).toBeVisible()
    await expect(username).toBeVisible()
    await expect(password).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page)

      const loggedText = page.getByText(`${users[0].username} logged in`)
      await expect(loggedText).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'wrong', 'wrong')
      await expectNotificationToContain(page, 'invalid')
    })

    test('only the user who added the blog sees the blogs delete button', async ({ page }) => {
      await loginWith(page, 'toor', 'toor')
      await page.getByRole('button', { name: 'view'}).first().click()
      
      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page)
      })
    
      test('a new blog can be created', async ({ page }) => {
        await createBlog(page)
        await expectNotificationToContain(page, `a new blog "${blogs[0].title}" added`)
      })

      test('a blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view'}).first().click()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes: 1')).toBeVisible()
      })

      test('user who added the blog can delete the blog', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept())
        await page.getByRole('button', { name: 'view'}).first().click()
        await page.getByRole('button', { name: 'remove' }).click()

        await expectNotificationToContain(page, 'blog successfully deleted')
      })

      test('blogs are arranged in the order according to the likes', async ({ page }) => {
        await page.getByRole('button', { name: 'view'}).last().click()
        const likeButton = page.getByRole('button', { name: 'like' })
      
        await elementClicker(page, likeButton, 5)

        await page.reload()

        const firstBlogContent = await page.locator('.blogContent').first()
        const text = blogs[blogs.length - 1].title
        await expect(firstBlogContent).toContainText(text)
      })
    })
  })
})