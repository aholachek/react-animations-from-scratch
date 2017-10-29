import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from './../Card'

// this cannot be a functional component
// as we will need to access its ref from the HOC wrapper
export default class Grid extends React.Component {
  static propTypes = {
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    defaultInvisibleItems: PropTypes.bool,
    backgroundColor: PropTypes.bool,
    showNumber: PropTypes.bool
  }
  render() {
    const { items, defaultInvisibleItems, backgroundColor } = this.props
    if (Array.isArray(items)) {
      return (
        <ul className={`grid ${backgroundColor? 'grid__background' : ''}`}>
          {this.props.items.map(item => (
            <li key={item.id}>
              <Card item={item} defaultInvisible={defaultInvisibleItems} showNumber />
            </li>
          ))}
        </ul>
      )
    } else {
      return (
        <div>
          {Object.values(items).map(itemGroup => (
            <Grid
              items={itemGroup}
              defaultInvisibleItems={defaultInvisibleItems}
            />
          ))}
        </div>
      )
    }
  }
}
