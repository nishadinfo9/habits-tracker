import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState(false);

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown"></div>
        <Link to={"/"} className="btn btn-ghost text-xl">
          Habit Tracker
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/"}>Add Habit</Link>
          </li>
          <li>
            <Link to={"/"}>My Habits</Link>
          </li>
          <li>
            <Link to={"/"}>All Habits</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          {user ? (
            <>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-md dropdown-content bg-base-100 rounded-box z-1 w-40 p-2 shadow"
              >
                <li>
                  <p className="justify-between">Display Name</p>
                </li>
                <li>
                  <p className="justify-between">email</p>
                </li>
                <li>
                  <button className="justify-between">Logout</button>
                </li>
              </ul>
            </>
          ) : (
            <button className="btn btn-success">Login</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
