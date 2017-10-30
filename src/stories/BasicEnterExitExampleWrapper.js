import React, { Component } from 'react'
import ListWithAnimation from './../examples/BasicEnterExitExample'
import generateItems from './generateItems'

class App extends Component {
  state = {
    items: generateItems(20),
    isVisible: false
  }
  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState({ items: generateItems(20) })
    }, 750)
  }
  componentWillUnmount() {
    this.intervalId && clearInterval(this.intervalId)
  }
  render() {
    return (
      <div className="App">
        <p>
          Item attributes are continually updating to show that the
          animation proceeds as normal even when children are being updated.
        </p>
        <div>
          {this.state.isVisible ? (
            <button onClick={() => this.setState({ isVisible: false })}>
              hide items
            </button>
          ) : (
            <button onClick={() => this.setState({ isVisible: true })}>
              show items
            </button>
          )}
        </div>

        <ListWithAnimation
          items={this.state.items}
          isVisible={this.state.isVisible}
          backgroundColor={true}
        />
      </div>
    )
  }
}

export default App
