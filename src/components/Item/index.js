import React from 'react'
import PropTypes from 'prop-types'

const Item = ({ item, defaultInvisible }) => {
  let className = `item ${defaultInvisible ? 'item__invisible' : ''}`
  if (item.shape) className = `${className} item__${item.shape}`
  if (item.color) className = `${className} item__${item.color}`
  return (
    <li
      className={className}
      // to allow DOM-aware animation methods to animate Items in and out,
      // we need to add this data attribute
      data-id={item.id}
    >
      {item.letter ? item.letter : item.id}
    </li>
  )
}

Item.propTypes = {
  item: PropTypes.object,
  defaultInvisible: PropTypes.bool
}

export default Item
