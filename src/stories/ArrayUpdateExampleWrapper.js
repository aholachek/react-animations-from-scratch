import React, { Component } from 'react'
import ListWithAnimation from './../examples/ArrayUpdateExample'
import generateItems from './generateItems'

function randomTrue(divisor) {
  return () => Math.random() <= 1 / divisor
}

const items = generateItems(75)

class App extends Component {
  state = { items: items.filter(randomTrue(3)) }
  render() {
    return (
      <div className="App">
        <div>
          <button
            className="btn btn-outline-primary mr-1"
            onClick={() =>
              this.setState(state => ({
                items: items.filter(randomTrue(3))
              }))}
          >
            Randomize Items
          </button>
        </div>
        <ListWithAnimation items={this.state.items} showNumber />
      </div>
    )
  }
}

export default App
