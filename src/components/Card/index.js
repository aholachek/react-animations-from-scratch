import React from 'react'
import PropTypes from 'prop-types'

const Card = ({ item, defaultInvisible, showNumber }) => {
  let className = `card ${defaultInvisible ? 'card__invisible' : ''}`
  if (item.shape) className = `${className} card__${item.shape}`
  if (item.color) className = `${className} card__${item.color}`
  return (
    <div
      className={className}
      // to allow DOM-aware animation methods to animate cards in and out,
      // we need to add this data attribute
      data-id={item.id}
    >
      {!showNumber && item.letter ? item.letter : item.id}
    </div>
  )
}

Card.propTypes = {
  item: PropTypes.object,
  defaultInvisible: PropTypes.bool,
  showNumber: PropTypes.number
}

export default Card
