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
    // to show that animations can proceed even as other parts of the component
    // are getting updated
    unrelatedProp: PropTypes.string
  }
  render() {
    const {
      items,
      defaultInvisibleItems,
      backgroundColor,
      unrelatedProp
    } = this.props

    const unrelatedSection = unrelatedProp ? (
      <div className="list__update-explanation">
       Unrelated updating props will not interfere with the animation:
        <div>
          <b>{unrelatedProp}</b>
        </div>
      </div>
    ) : null

    if (Array.isArray(items)) {
      return (
        <div>
          {unrelatedSection}
          <ul className={`list ${backgroundColor ? 'list--background' : ''}`}>
            {this.props.items.map(item => (
              <Item
                item={item}
                defaultInvisible={defaultInvisibleItems}
                key={item.id}
              />
            ))}
          </ul>
        </div>
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
