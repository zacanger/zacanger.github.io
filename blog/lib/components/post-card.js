import React from 'react'
import { Post } from './types'
import formatDate from './format-date'

const PostCard = ({ post }) => {
  const a = new Date(post.created)
  const date = formatDate(a)

  return (
    <div>
      <a href={'/blog/posts/' + post.slug}>
        {post.title} &mdash; {date}
        {post.subhead &&
          <div>
            {post.subhead}
          </div>
        }
      </a>
    </div>
  )
}

PostCard.propTypes = {
  post: Post
}

export default PostCard
