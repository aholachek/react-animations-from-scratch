import React, { Component } from 'react'
import GridWithAnimation from './../examples/BasicEnterExitExample'
import generateItems from './generateItems'

class App extends Component {
  state = {
    items: []
  }
  render() {
    return (
      <div className="App">
        <div className="m-3">
          {this.state.items.length ? (
            <button onClick={() => this.setState({ items: [] })}>
              hide items
            </button>
          ) : (
            <button onClick={() => this.setState({ items: generateItems(20) })}>
              show items
            </button>
          )}
        </div>
        <GridWithAnimation
          items={this.state.items}
          isVisible={this.state.items.length}
          backgroundColor={true}
        />
      </div>
    )
  }
}

export default App
