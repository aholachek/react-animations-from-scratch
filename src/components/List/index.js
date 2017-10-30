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
      <div className='list__update-explanation'>
        <div>
          <b>{unrelatedProp}</b>
        </div>
        An updating prop also rendered in the list container, in order to show that unrelated props data
        will not cause the exit/update/enter animation to short-circuit.
      </div>
    ) : null

    if (Array.isArray(items)) {
      return (
        <div>
          <ul className={`list ${backgroundColor ? 'list--background' : ''}`}>
            {this.props.items.map(item => (
              <Item
                item={item}
                defaultInvisible={defaultInvisibleItems}
                key={item.id}
              />
            ))}
          </ul>
          {unrelatedSection}
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
