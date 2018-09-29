import React from 'react'
import { string, arrayOf } from 'prop-types'
import { Post } from './types'

const socialMeta = ({
  author,
  card,
  description,
  image,
  title = 'Zac Anger\'s Blog'
}) => (
  <React.Fragment>
    <meta name="twitter:card" content={card} />
    <meta name="twitter:site" content={author} />
    <meta name="twitter:creator" content={author} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
    <meta property="og:type" content="article" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:site_name" content="https://zacanger.com/blog" />
    <meta property="og:image" content={image} />
  </React.Fragment>
)
socialMeta.propTypes = {
  author: string,
  card: string,
  description: string,
  image: string,
  title: string
}

const Head = ({
  title,
  post,
  keywords,
  author,
  ...props
}) => {
  const tags = keywords.concat((post && post.tags) || [])
  const description = (post && post.excerpt) || props.description

  return (
    <head>
      <meta charSet="utf-8" />
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      <title>{post ? (post.title + ' | ' + title) : title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      <meta name="keywords" content={tags.join()} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {socialMeta({
        author: '@zacanger',
        card: 'summary',
        image: 'https://zacanger.com/logo.png',
        title: post ? post.title : title,
        description
      })}
      <link rel="stylesheet" type="text/css" href="/blog/assets/styles.css" />
      <link rel="stylesheet" type="text/css" href="/blog/assets/github-gist.css" />
    </head>
  )
}

Head.propTypes = {
  title: string,
  description: string,
  author: string,
  post: Post,
  keywords: arrayOf(string)
}

export default Head
