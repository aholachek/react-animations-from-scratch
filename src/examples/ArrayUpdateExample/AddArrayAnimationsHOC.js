import React, { Component } from 'react'
import ReactDOM from 'react-dom'

// function used by componentWillReceiveProps and shouldComponentUpdate
// to figure out whether there are entering items and/or exiting items
function getComparisonData(currentProps, nextProps) {
  const currentIds = currentProps.items.map(item => item.id)
  const nextIds = nextProps.items.map(item => item.id)
  const removedIds = currentIds.filter(id => !nextIds.includes(id))
  const addedIds = nextIds.filter(id => !currentIds.includes(id))
  const persistentIds = nextIds.filter(id => currentIds.includes(id))
  return {
    removedIds,
    addedIds,
    persistentIds
  }
}

export default function addArrayAnimations(
  animateItemsIn,
  animateItemsOut,
  animatePersistentItems
) {
  return function wrapComponent(WrappedComponent) {
    return class AnimationHOC extends Component {
      state = {
        animatingOutItems: undefined
      }

      componentDidMount() {
        animateItemsIn(this.child, this.props.items.map(item => item.id), true)
      }

      componentWillReceiveProps(nextProps) {
        const { removedIds } = getComparisonData(this.props, nextProps)
        removedIds.length &&
          this.setState({ animatingOutItems: this.props.items })
      }

      shouldComponentUpdate(nextProps, nextState) {
        const { removedIds, addedIds, persistentIds } = getComparisonData(
          this.props,
          nextProps
        )

        if (removedIds.length || addedIds.length) {
          // preload this function with previous item positions
          const animatePersistentPositions = animatePersistentItems(
            this.child,
            persistentIds
          )

          animateItemsOut(this.child, removedIds).then(() => {
            // this function will be called by componentDidUpdate as soon as we set
            // animatingOutItems state to undefined
            this._updateAnimation = () => {
              animatePersistentPositions().then(() =>
                animateItemsIn(this.child, addedIds)
              )
            }
            this.setState({ animatingOutItems: undefined })
          })
          return false
        } else {
          return true
        }
      }

      componentDidUpdate(prevProps, prevState) {
        if (prevState.animatingOutItems && !this.state.animatingOutItems) {
          this._updateAnimation()
          delete this._updateAnimation
        }
      }

      render() {
        const getRef = component => {
          return component && (this.child = ReactDOM.findDOMNode(component))
        }
        const { items, ...passThroughProps } = this.props

        return (
          <WrappedComponent
            items={ this.state.animatingOutItems || items }
            { ...passThroughProps }
            ref={ getRef }
            defaultInvisibleItems
          />
        )
      }
    }
  }
}
