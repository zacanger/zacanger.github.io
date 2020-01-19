import React from 'react'
import { Post as PostType } from './types'

const Post = ({ post }) => (
  <div dangerouslySetInnerHTML={{ __html: post.html }} />
)

Post.propTypes = {
  post: PostType,
}

export default Post
