import React, { Component } from 'react';
import "../Tooltip/Tooltip.scss";

class Tooltip extends Component {
  render() {
    const { text, children, component: ComponentTag = "span" } = this.props;

    return (
      <ComponentTag className="tooltip">
        {children}
        <span className="tooltiptext">{text}</span>
      </ComponentTag>
    );
  }
}

export default Tooltip;
