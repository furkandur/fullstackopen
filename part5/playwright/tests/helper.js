const { expect } = require("@playwright/test")

const users = [
  {
    username: 'root',
    password: 'root',
    name: 'root'
  },
  {
    username: 'toor',
    password: 'toor',
    name: 'toor'
  }
]

const blogs = [
  {
    title: 'Lorem ipsum dolor sit amet.',
    author: 'Roothor',
    url: 'https://www.google.com'
  },
  {
    title: 'Understanding JavaScript Closures',
    author: 'John Doe',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures',
  },
  {
    title: 'A Guide to Responsive Web Design',
    author: 'Jane Smith',
    url: 'https://www.smashingmagazine.com/responsive-web-design/',
  },
  {
    title: 'The Future of Artificial Intelligence',
    author: 'Elon Tech',
    url: 'https://www.openai.com/blog/',
  },
  {
    title: 'Mastering Python for Data Science',
    author: 'Data Guru',
    url: 'https://realpython.com/',
  },
  {
    title: 'Introduction to Functional Programming',
    author: 'Lambda Lover',
    url: 'https://www.freecodecamp.org/news/functional-programming-concepts/',
  }
]


const loginWith = async (page, username = users[0].username, password = users[0].password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByTestId('login').click()
}

const createBlog = async (page, newBlog = blogs[0]) => {
  await page.getByRole('button', {name: 'create blog'}).click()
  await page.getByTestId('title').fill(newBlog.title)
  await page.getByTestId('author').fill(newBlog.author)
  await page.getByTestId('url').fill(newBlog.url)
  await page.getByTestId('blog-submit').click()
}

const expectNotificationToContain = async (page, msg) => {
  const notification = page.getByTestId('notification')
  await expect(notification).toContainText(msg)
}

const elementClicker = async (page, element, clicks) => {
  for (let i = 0; i < clicks; i++) {
    await element.click()
    await page.waitForTimeout(250)

  }
}

export {
  users,
  blogs,
  loginWith,
  createBlog,
  expectNotificationToContain,
  elementClicker
}