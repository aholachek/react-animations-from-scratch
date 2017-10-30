import React, { Component } from "react"
import AddAnimations from "./HOC/AddAnimations"
import AddArrayAnimations from "./HOC/AddArrayAnimations"
import List from "./List"
import { animateIn, animateOut } from "./List/animations"
import { animateItemsIn, animateItemsOut } from "./Item/animations"
import { compose } from "lodash/fp"

const ListWithAnimation = compose(
  // AddArrayAnimations(animateItemsIn, animateItemsOut),
  AddAnimations(animateIn, animateOut)
)(List)

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
                Hide List
              </button>
            ) : (
              <button
                className="btn btn-outline-primary"
                onClick={() => this.setState({ items: 8 })}
              >
                Show List
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
        <ListWithAnimation
          isVisible={!!this.state.items}
          items={[...Array(this.state.items).keys()]}
        />
      </div>
    )
  }
}

export default App
