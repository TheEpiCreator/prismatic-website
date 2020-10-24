import React from "react";
import ReactDom from "react-dom";

class Switch extends React.Component {
    render() {
        return <div>The switch is {this.props.state}</div>;
    }
}

ReactDom.render(<Switch />, document.getElementsByTagName("switch"));