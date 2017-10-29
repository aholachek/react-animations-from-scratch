import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default function addAnimation (animateIn, animateOut) {
  return function wrapComponent (WrappedComponent) {
    return class AnimationHOC extends Component {
      // on initial mount, animate in the child
      componentDidMount () {
        if (this.props.isVisible) animateIn(this.child)
      }
      // take over the removal of the child in order to animate it
      shouldComponentUpdate (nextProps, nextState) {
        if (this.props.isVisible && !nextProps.isVisible) {
          // forceUpdate is the "complete" callback
          // surround it in a function call so that we don't provide forcUpdate any params
          animateOut(this.child, () => this.forceUpdate, this.currentAnimation)
          return false
        }
        return true
      }
      // the child is newly visible, so animate it in
      componentDidUpdate (prevProps) {
        if (!prevProps.isVisible && this.props.isVisible) {
          animateIn(this.child)
        }
      }

      render () {
        const { isVisible, ...rest } = this.props
        const getRef = component => {
          return component && (this.child = ReactDOM.findDOMNode(component))
        }
        return !!isVisible && <WrappedComponent {...rest} ref={getRef} />
      }
    }
  }
}
