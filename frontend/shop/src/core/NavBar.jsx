import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../auth/helper";
import { useAuth } from "../auth/helper/AuthContext";


function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Access the authState using the custom hook useAuth
  const { authState, dispatch } = useAuth();
  const { isAuthenticated } = authState; // Destructure the isAuthenticated from authState

  const currentTab = (path) =>
    location.pathname === path ? { color: "#2ecc72" } : { color: "#ffffff" };

  const handleLogout = async () => {
    await logout();
    dispatch({ type: "SET_AUTHENTICATED", payload: false }); // Set isAuthenticated to false in the authState
    navigate("/signin");
  };

  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <Link style={currentTab("/")} className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link style={currentTab("/cart")} className="nav-link" to="/cart">
            Cart
          </Link>
        </li>
        <li className="nav-item">
          <Link style={currentTab("/signup")} className="nav-link" to="/signup">
            Signup
          </Link>
        </li>
        {!isAuthenticated ? (
          <li className="nav-item">
            <Link style={currentTab("/signin")} className="nav-link" to="/signin">
              LogIn
            </Link>
          </li>
        ) : (
          <li className="nav-item">
            <Link
              style={{ cursor: "pointer", ...currentTab("/signin") }}
              className="nav-link text-warning"
              to="/signin"
              onClick={handleLogout}
            >
              LogOut
            </Link>
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
