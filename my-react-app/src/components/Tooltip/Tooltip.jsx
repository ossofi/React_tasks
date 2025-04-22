import "../Tooltip/Tooltip.scss";

const Tooltip = ({ text, children, component: Component = "span" }) => {
  return (
    <Component className="tooltip">
      {children}
      <span className="tooltiptext">{text}</span>
    </Component>
  );
};

export default Tooltip;
