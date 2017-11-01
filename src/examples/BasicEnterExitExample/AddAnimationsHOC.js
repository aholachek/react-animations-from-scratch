import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default function addAnimation(animateIn, animateOut) {
  return function wrapComponent(WrappedComponent) {
    return class AnimationHOC extends Component {

      state = { animatingOut: false }

      componentDidMount() {
        if (this.props.isVisible) animateIn(this.child)
      }

      componentWillReceiveProps(nextProps) {
        if (this.props.isVisible && !nextProps.isVisible) {
          this.setState({ animatingOut: true })
        }
      }

      shouldComponentUpdate(nextProps) {
        if (this.props.isVisible && !nextProps.isVisible) {
          animateOut(this.child, () => {
            this.setState({ animatingOut: false })
          })
          return false
        }
        return true
      }

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
