import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./helper/AuthContext";


function NavBar() {
  let location = useLocation();
  let navigate = useNavigate();

  // Get the isAuthenticated value and the signOut function from the useAuth hook
  const { isAuthenticated, signOut, authState } = useAuth(); 

  // when NavBar is first rendered assume that authentication data is still loading
  // added this functionality b/c isAuthenticated was coming up as undefied 
  // If the authentication state is still loading, you can choose to render a loading message or nothing
  // This can be helpful if there are certain components or elements that depend on the authentication state
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    // When the isAuthenticated value is defined in the authState, setLoading to false
    if (typeof authState.isAuthenticated !== "undefined") {
      setLoading(false);
    }
  }, [authState.isAuthenticated]);

  // Render a message (TODO TRY A SPINNER) while auth state is being fetched
  if(loading) {
    return <div>loading...</div>
  };

  
    
  console.log("isAuthenticated is", isAuthenticated, "from navbar") //..TEST
  console.log("loading:", loading); // Log the loading state
  console.log("isAuthenticated is", isAuthenticated, "from navbar"); // Log the isAuthenticated state
  console.log("authState:", authState); // Log the entire authState object
  
  /**
   * Function to determine the current tab style based on the route path.
   * @param {object} location - The current location object from the `useLocation` hook.
   * @param {string} path - The path to compare with the current location pathname.
   * @returns {object} The style object with the color property for the current tab.
   */
  let currentTab = (path) => {
    if (location.pathname === path) {
      return { color: "#2ecc72" };
    } else {
      return { color: "#ffffff" };
    }
  };

  let handleLogout = () => {
    signOut();
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
        {/* Conditional rendering of Signin link */}
        {!isAuthenticated ? (
          // If the user is not signed in, render the Signin link
          <li className="nav-item">
            <Link style={currentTab("/signin")} className="nav-link" to="/signin">
              LogIn
            </Link>
          </li>
        ) : (
          // If the user is signed in, render the Signout link
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
        {/* Signup link */}
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
