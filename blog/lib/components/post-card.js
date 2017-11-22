import React from 'react'
import { shape, string, bool } from 'prop-types'
import moment from 'moment'
import formatDate from './format-date'

const PostCard = ({ post }) => {
  const a = new Date(post.created)
  const date = formatDate(a)

  return (
    <div>
      <h2>
        <a href={'/blog/posts/' + post.slug}>
          {post.title} &mdash; {date}
          {post.subhead &&
            <div>
              {post.subhead}
            </div>
          }
        </a>
      </h2>
      <p>{post.excerpt}</p>
      <a href={'/blog/posts/' + post.slug}>
        Read more
      </a>
    </div>
  )
}

PostCard.propTypes = {
  post: shape({
    title: string,
    subhead: string,
    excerpt: string,
    date: string,
    slug: string
  })
}

export default PostCard
