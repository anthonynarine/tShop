import { baseUrl } from "../../core/shared";

/**
 * Stores the user token and user info in the localStorage
 *
 * @param {Object} data - The data object should contain the user token
 * @param {function} next - A callback function
 */
export const authenticate = (data, next) => {
  // Check if the window object is defined (for client-side rendering)
  if (typeof window !== "undefined") {
    if (data.token && data.user) {
      // Store the token in the local storage
      localStorage.setItem("token", JSON.stringify(data));
      localStorage.setItem("user", JSON.stringify(data.user));

      // Execute the callback function
      next();
    } else {
      // Log an error when the data object is not valid
      console.error("Invalid data object. Expected an object with a token property.");
    }
  }
};

//.....

/**
 * Checks if the user is authenticated by verifying the presence of a token in the local storage.
 * @returns {boolean} - Returns true if the user is authenticated, false otherwise.
 */
export const isAuthenticated = () => {
  // Check if the window object is not defined (for server-side rendering)
  if (typeof window === "undefined") {
    return false;
  }

  // Check if a token exists in the local storage returns true if token exist false if it does not
  return localStorage.getItem("token") !== null;
};

//.....

/**
 * Retrieves the authenticated user's information from the local storage.
 *
 *  require user-specific identifiers. For example, our Django backend
 * requires the user's id to process a logout request. By storing and retrieving the user's information in local storage,
 * we can easily access this id whenever we need to make such a request to the backend.
 *
 * Note: The local storage content persists across different browsing sessions and tabs until explicitly cleared. This
 * means the user's information will remain available even if the page is refreshed or opened in a new tab.
 *
 * @returns {Object|null} - The authenticated user's information if available, null otherwise.
 */
export const getAuthenticatedUser = () => {
  // Check if the window object is not defined (for server-side rendering)
  if (typeof window === "undefined") {
    return null;
  }

  // If the user information exists in the local storage, parse it from JSON to an object and return it
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"));
  } else {
    return null;
  }
};

export const logout = async () => {
  // Get the authenticated user
  const user = getAuthenticatedUser();  // Django user view logout function requires a user id

  // Check if the window object is defined (for client-side rendering)
  if (typeof window !== "undefined") {
    // Get the user id
    const userId = user ? user.id : null;

    if (userId) {
      // Remove the token from the local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Make a request to the backend to log out the user
      try {
        const response = await fetch(`${baseUrl}/user/logout/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          // If the HTTP status code is not in the 200-299 range
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        console.log("Signout Success");
        // Navigate("")
        return data;
      } catch (error) {
        console.error("There has been a problem with your fetch operation: ", error);
      }
    }
  }
};
