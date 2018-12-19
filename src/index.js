import React, { Component } from "react";
import ReactDOM from "react-dom";

class WatchClickOutside extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    document.body.addEventListener("click", this.handleClick);
  }

  componentWillUnmount() {
    // remember to remove all events to avoid memory leaks
    document.body.removeEventListener("click", this.handleClick);
  }
  myRef = React.createRef();
  handleClick(event) {
    const { onClickOutside } = this.props;

    // if there is no proper callback - no point of checking
    if (typeof onClickOutside !== "function") {
      return;
    }

    // if target is container - container was not clicked outside
    // if container contains clicked target - click was not outside of it
    if (!this.myRef.current.contains(event.target)) {
      onClickOutside(event); // clicked outside - fire callback
    }
  }

  render() {
    return <div ref={this.myRef}>{this.props.children}</div>;
  }
}

class Demo extends React.Component {
  handleClickOutside() {
    alert("clicked outside!");
  }

  render() {
    return (
      <div>
        Click on this to see alert
        <WatchClickOutside onClickOutside={this.handleClickOutside}>
          Click Outside of me!
        </WatchClickOutside>
        Click on this to see alert
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById("root"));
