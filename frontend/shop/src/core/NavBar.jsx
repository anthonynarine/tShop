import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../auth/helper";
import { useAuth } from "../auth/helper/AuthContext";

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { authState, dispatch } = useAuth();
  const { isAuthenticated } = authState;

  const handleLogout = async () => {
    await logout();
    dispatch({ type: "SET_AUTHENTICATED", payload: false });
    navigate("/signin");
  };

  const isActiveTab = (path) => location.pathname === path;

  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        {/* Home Link */}
        <li className="nav-item">
          <Link
            to="/"
            className="nav-link"
            style={isActiveTab("/") ? { color: "#2ecc72" } : { color: "#ffffff" }}
          >
            Home
          </Link>
        </li>

        {/* Cart Link */}
        <li className="nav-item">
          <Link
            to="/cart"
            className="nav-link"
            style={isActiveTab("/cart") ? { color: "#2ecc72" } : { color: "#ffffff" }}
          >
            Cart
          </Link>
        </li>

        {/* Signup Link */}
        <li className="nav-item">
          <Link
            to="/signup"
            className="nav-link"
            style={isActiveTab("/signup") ? { color: "#2ecc72" } : { color: "#ffffff" }}
          >
            Signup
          </Link>
        </li>

        {/* Signin Link */}
        {!isAuthenticated && (
          <li className="nav-item">
            <Link
              to="/signin"
              className="nav-link"
              style={isActiveTab("/signin") ? { color: "#2ecc72" } : { color: "#ffffff" }}
            >
              Signin
            </Link>
          </li>
        )}

        {/* Logout Button */}
        {isAuthenticated && (
          <li className="nav-item">
            <button
              className="nav-link btn btn-link text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default NavBar;




// useLocation hook
/* In React Router, the useLocation hook is a custom hook that allows
you to access the current location object, which represents the 
current URL's path and other related information. It is a convenient
way to access the current route's information and use it in your
components. */
