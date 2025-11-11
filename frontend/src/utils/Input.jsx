import React from "react";
import icon from "../assets/complete.png";

const Input = ({
  spin,
  label,
  children,
  type = "text",
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full mb-4 relative">
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-300">
          {label}
        </label>
      )}

      <input
        type={type}
        className={`w-full px-3 py-2 rounded-lg text-sm 
          bg-gray-900 border border-gray-700 text-white 
          placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
          transition-all duration-200
          ${error ? "border-red-500 focus:ring-red-500" : ""}
          ${className}
        `}
        {...props}
      />
      {type === "file" && spin && (
        // <img className="absolute right-5 top-9 w-5" src={icon} alt="" />
        <span className="absolute right-5 top-10 loading loading-spinner loading-xs"></span>
      )}

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
