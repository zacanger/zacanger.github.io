import React from 'react'
import { string } from 'prop-types'

const Header = ({ title, description }) => (
  <header>
    <h1><a href="/blog">Zac Anger's Blog</a></h1>
    {title && <h2>{title}</h2>}
    {description && <div>{description}</div>}
  </header>
)

Header.propTypes = {
  title: string,
  description: string
}
export default Header
