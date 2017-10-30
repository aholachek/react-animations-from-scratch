import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default function addArrayAnimations (
  animateItemsIn,
  animateItemsOut,
  animatePersistentItems
) {
  return function wrapComponent (WrappedComponent) {
    return class AnimationHOC extends Component {
      componentDidMount () {
        animateItemsIn(this.child, this.props.items.map(item => item.id), true)
      }
      shouldComponentUpdate (nextProps, nextState) {
        if (nextProps.items === this.props.items) return true
        const currentIds = this.props.items.map(item => item.id)
        const nextIds = nextProps.items.map(item => item.id)

        const removedIds = currentIds.filter(id => !nextIds.includes(id))
        const addedIds = nextIds.filter(id => !currentIds.includes(id))
        const persistentIds = nextIds.filter(id => currentIds.includes(id))

        if (removedIds.length || addedIds.length) {
          // preload this function with previous Item positions
          const animatePersistentPositions = animatePersistentItems(
            this.child,
            persistentIds
          )
          this._updateAnimation = () => {
            animatePersistentPositions().then(() =>
              animateItemsIn(this.child, addedIds)
            )
          }

          animateItemsOut(this.child, removedIds).then(() => {
            this.forceUpdate()
          })
          return false
        } else {
          delete this._updateAnimation
          return true
        }
      }

      componentDidUpdate () {
        this._updateAnimation && this._updateAnimation()
      }

      render () {
        const getRef = component => {
          return component && (this.child = ReactDOM.findDOMNode(component))
        }
        return (
          <WrappedComponent
            {...this.props}
            ref={getRef}
            defaultInvisibleItems
          />
        )
      }
    }
  }
}
