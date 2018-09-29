import React from 'react'
import { Post as PostType } from './types'

const base = 'https://github.com/zacanger/zacanger.github.io/issues/new?title='

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
  post: PostType
}

export default Post
