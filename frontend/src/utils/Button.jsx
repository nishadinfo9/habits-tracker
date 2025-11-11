import React from "react";

const Button = ({
  type = "button",
  children,
  onClick,
  className = "btn-primary",
  disabled = false,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 text-black btn rounded-sm font-medium border transition-all duration-200
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
