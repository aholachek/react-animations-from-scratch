import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default function addArrayAnimations (animateGroups) {
  return function wrapComponent (WrappedComponent) {
    return class AnimationHOC extends Component {
      componentWillReceiveProps (newProps) {
        if (newProps.group !== this.props.group) {
          this._initiateAnimation = animateGroups(this.child)
        } else {
          delete this._initiateAnimation
        }
      }

      componentDidUpdate () {
        this._initiateAnimation && this._initiateAnimation()
      }

      render () {
        const getRef = component =>
          component && (this.child = ReactDOM.findDOMNode(component))
        return <WrappedComponent {...this.props} ref={getRef} />
      }
    }
  }
}
