import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default function addAnimation(animateIn, animateOut) {
  return function wrapComponent(WrappedComponent) {
    return class AnimationHOC extends Component {
      // keep element in the DOM while it is animating
      state = { animatingOut: false }
      // on initial mount, animate in the child
      componentDidMount() {
        if (this.props.isVisible) animateIn(this.child)
      }
      componentWillReceiveProps(nextProps) {
        if (this.props.isVisible && !nextProps.isVisible) {
          this.setState({ animatingOut: true })
        }
      }
      // take over the removal of the child in order to animate it
      shouldComponentUpdate(nextProps) {
        if (this.props.isVisible && !nextProps.isVisible) {
          animateOut(this.child, () => {
            this.setState({ animatingOut: false })
          })
          return false
        }
        return true
      }
      // the child is newly visible, so animate it in
      componentDidUpdate(prevProps) {
        if (!prevProps.isVisible && this.props.isVisible) {
          animateIn(this.child)
        }
      }
      render() {
        const { isVisible, ...rest } = this.props
        const getRef = component => {
          return component && (this.child = ReactDOM.findDOMNode(component))
        }
        return (
          (!!isVisible || this.state.animatingOut) && (
            <WrappedComponent {...rest} ref={getRef} />
          )
        )
      }
    }
  }
}
