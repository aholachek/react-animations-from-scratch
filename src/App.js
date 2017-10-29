import React, { Component } from "react"
import AddAnimations from "./HOC/AddAnimations"
import AddArrayAnimations from "./HOC/AddArrayAnimations"
import Grid from "./Grid"
import { animateIn, animateOut } from "./Grid/animations"
import { animateCardsIn, animateCardsOut } from "./Card/animations"
import { compose } from "lodash/fp"

const GridWithAnimation = compose(
  // AddArrayAnimations(animateCardsIn, animateCardsOut),
  AddAnimations(animateIn, animateOut)
)(Grid)

class App extends Component {
  state = { items: 0 }
  render() {
    return (
      <div className="App">
        <div style={{ height: "100px" }}>
          <div className="m-3">
            {this.state.items ? (
              <button
                className="btn btn-outline-primary"
                onClick={() => this.setState({ items: 0 })}
              >
                Hide grid
              </button>
            ) : (
              <button
                className="btn btn-outline-primary"
                onClick={() => this.setState({ items: 8 })}
              >
                Show grid
              </button>
            )}
          </div>
          {!!this.state.items && (
            <div className="m-3">
              <button
                className="btn btn-outline-primary mr-1"
                onClick={() =>
                  this.setState(state => ({
                    items: state.items + 1
                  }))}
              >
                Add an item
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={() =>
                  this.setState(state => ({
                    items: state.items - 1
                  }))}
              >
                Remove an item
              </button>
            </div>
          )}
        </div>
        <GridWithAnimation
          isVisible={!!this.state.items}
          items={[...Array(this.state.items).keys()]}
        />
      </div>
    )
  }
}

export default App
