import React, { ReactNode, Component, ElementType } from 'react';
import "../Tooltip/Tooltip.scss";

interface TooltipProps {
  text: string;
  children: ReactNode;
  component?: ElementType;
}

class Tooltip extends Component<TooltipProps> {
  static defaultProps = {
    component: 'span',
  };

  render() {
    const { text, children, component: ComponentTag = 'span' } = this.props;

    return (
      <ComponentTag className="tooltip">
        {children}
        <span className="tooltiptext">{text}</span>
      </ComponentTag>
    );
  }
}

export default Tooltip;
