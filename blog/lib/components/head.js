import React from 'react'
import { string, arrayOf, any } from 'prop-types'

import styles from './styles.css'

const socialMeta = ({
  author,
  card,
  description,
  image,
  title = 'Zac Anger\'s Blog'
}) => [
  <meta name="twitter:card" content={card} />,
  <meta name="twitter:site" content={author} />,
  <meta name="twitter:creator" content={author} />,
  <meta name="twitter:title" content={title} />,
  <meta name="twitter:description" content={description} />,
  <meta name="twitter:image" content={image} />,
  <meta property="og:type" content="article" />,
  <meta property="og:title" content={title} />,
  <meta property="og:description" content={description} />,
  <meta property="og:site_name" content="http://zacanger.com/blog" />,
  <meta property="og:image" content={image} />
]

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
        image: 'http://zacanger.com/logo.png',
        title: post ? post.title : title,
        description
      })}
      <style type="text/css" dangerouslySetInnerHTML={{ __html: styles }} />
      <script type="text/javascript" href="/assets/highlight.pack.js" />
      <link rel="stylesheet" type="text/css" href="/assets/github-gist.css" />
    </head>
  )
}

Head.propTypes = {
  title: string,
  description: string,
  author: string,
  post: any,
  keywords: arrayOf(string)
}

export default Head
