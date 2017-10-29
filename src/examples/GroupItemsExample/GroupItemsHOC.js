import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import isEqual from 'deep-equal'

export default function addArrayAnimations (
  animateGroups
) {
  return function wrapComponent (WrappedComponent) {
    return class AnimationHOC extends Component {
      componentWillReceiveProps (newProps) {
        if (!isEqual(newProps.group, this.props.group)) {
          this._readyToAnimate = animateGroups(this.child)
        }
      }

      componentDidUpdate (prevProps, prevState) {
        if (!isEqual(prevProps.group, this.props.group)) {
          this._readyToAnimate()
        }
      }

      render () {
        const getRef = component => component && (this.child = ReactDOM.findDOMNode(component))
        return <WrappedComponent {...this.props} ref={getRef} />
      }
    }
  }
}
