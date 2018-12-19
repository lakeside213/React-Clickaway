import React, { Component } from "react";
import { render } from "react-dom";
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};
class SampleComponent extends Component {
  state = {
    clickedOutside: false
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  myRef = React.createRef();

  handleClickOutside = e => {
    if (!this.myRef.current.contains(e.target)) {
      this.setState({ clickedOutside: true });
    }
  };

  handleClickInside = () => this.setState({ clickedOutside: false });

  render() {
    return (
      <button ref={this.myRef} onClick={this.handleClickInside}>
        {this.state.clickedOutside ? "Bye!" : "Hello!"}
      </button>
    );
  }
}

const App = () => (
  <div style={styles}>
    <SampleComponent />
  </div>
);

render(<App />, document.getElementById("root"));

export default SampleComponent;
