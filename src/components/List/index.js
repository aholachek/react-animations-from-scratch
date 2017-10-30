import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Item from './../Item'

// this cannot be a functional component
// as we will need to access its ref from the HOC wrapper
export default class List extends React.Component {
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
        <ul className={`list ${backgroundColor ? 'list__background' : ''}`}>
          {this.props.items.map(item => (
            <Item
              item={item}
              defaultInvisible={defaultInvisibleItems}
              showNumber
              key={item.id}
            />
          ))}
        </ul>
      )
    } else {
      return (
        <div>
          {Object.values(items).map(itemGroup => (
            <List
              items={itemGroup}
              defaultInvisibleItems={defaultInvisibleItems}
            />
          ))}
        </div>
      )
    }
  }
}
