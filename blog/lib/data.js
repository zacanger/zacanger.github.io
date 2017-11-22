import fs from 'fs'
import path from 'path'
import fm from 'front-matter'
import cheerio from 'cheerio'
import { author, keywords, description } from '../package.json'
import Md from 'markdown-it'
import highlight from 'markdown-it-highlightjs'
import dl from 'markdown-it-deflist'
import tasks from 'markdown-it-task-lists'

const md = Md().use(dl).use(tasks).use(highlight)

const dir = './src/posts'

const filenames = fs.readdirSync(dir)
  .filter((filename) => !/^\./.test(filename))

const mapFiles = (filename) => {
  const content = fs.readFileSync(path.join(dir, filename), 'utf8')
  let matter
  try {
    matter = fm(content)
  } catch (e) {
    console.error({ e, content })
    process.exit((e && e.code) || 1)
  }
  const html = md.render(matter.body)
  const $ = cheerio.load(html)
  const excerpt = matter.attributes.excerpt || $('p').first().text()
  return {
    ...matter.attributes,
    slug: filename.replace(/\.md/, ''),
    body: matter.body,
    html,
    excerpt
  }
}

const posts = filenames
  .map(mapFiles)
  .sort((a, b) => new Date(b.created) - new Date(a.created))

const pageSize = 10
const pages = Math.ceil(posts.length / pageSize)
const postRoutes = filenames.map((filename) => '/posts/' + filename.replace(/\.md$/, ''))
const pageRoutes = Array(pages).fill().map((_, i) => `/page/${i + 1}`)
const routes = [ '/', ...pageRoutes, ...postRoutes ]

const data = {
  author,
  baseUrl: '/blog/',
  description,
  href: '/blog',
  keywords,
  links: [],
  pageSize,
  pages,
  posts,
  routes,
  title: 'Zac Anger\'s Blog'
}

module.exports = data
