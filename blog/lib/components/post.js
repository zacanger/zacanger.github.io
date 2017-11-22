import React from 'react'
import { shape, string } from 'prop-types'

const base = 'https://github.com/zacanger/blog/issues/new?title='

const Post = ({ post }) => (
  <div>
    <div dangerouslySetInnerHTML={{ __html: post.html }} />
    <p>
      <a href={`${base}${post.title}`} target="_blank">
        Submit a bug report
      </a>
    </p>
  </div>
)

Post.propTypes = {
  post: shape({
    html: string.isRequired,
    title: string.isRequired
  }).isRequired
}

export default Post
