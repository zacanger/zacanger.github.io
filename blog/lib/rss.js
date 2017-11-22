require('babel-register')()

const fs = require('fs')
const Rss = require('rss')
const data = require('./data')

const { title, description, author } = data

const options = {
  title,
  description,
  site_url: 'http://zacanger.com/blog',
  image_url: 'http://zacanger.com/logo'
}

const feed = new Rss(options)

console.log(`Generating RSS feed for ${data.posts.length}.`)

data.posts.forEach((post) => {
  feed.item({
    title: post.title,
    description: post.excerpt,
    date: post.created,
    url: `http://zacanger.com/blog/posts/${post.slug}`,
    guid: post.slug,
    categories: post.tags,
    author
  })
})

const xml = feed.xml()

fs.writeFileSync('rss.xml', xml)
