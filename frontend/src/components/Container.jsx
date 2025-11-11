import React from "react";
const Container = ({
  children,
  className = "",
  maxWidth = "max-w-7xl",
  padding = "px-4",
  as: Component = "div",
  ...props
}) => {
  return (
    <Component
      className={`w-full ${maxWidth} ${padding} mx-auto ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Container;
