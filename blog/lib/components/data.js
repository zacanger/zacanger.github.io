import React from 'react'
import { object, node, any } from 'prop-types'

class Data extends React.Component {
  getChildContext () {
    return {
      data: this.props.data
    }
  }

  render () {
    return this.props.children
  }
}

Data.childContextTypes = {
  data: object.isRequired
}

Data.propTypes = {
  data: any,
  children: node
}

export default Data
