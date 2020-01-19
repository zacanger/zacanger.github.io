import { shape, string, arrayOf } from 'prop-types'

export const Post = shape({
  date: string.isRequired,
  excerpt: string,
  html: string.isRequired,
  slug: string.isRequired,
  subhead: string,
  tags: arrayOf(string),
  title: string.isRequired,
})
