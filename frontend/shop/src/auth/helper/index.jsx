import { API } from "../../backend";
import { cartEmpty } from "../../core/helper/cartHelper";
import { baseUrl } from "../../core/shared";

/**
 * Performs a signup API request.
 * @param {object} userData - The user signup data.
 */
export const signup = async (userData) => {
    try {
      // Send a POST request to the signup API endpoint
      const response = await fetch(`${API}user/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error("Signup failed");
      }
  
      // Parse the response data as JSON
      const data = await response.json();
      console.log("Data:", data);
    } catch (error) {
      console.error("Error occurred during signup:", error);
      throw new Error("Signup failed");
    }
  };



/**
 * Performs a login API request.
 * @param {object} userData - The user login data.
 * @property {string} userData.username - The username of the user.
 * @property {string} userData.password - The password of the user.
 */
export const login = async (userData) => {

// Constructs a new FormData object.
  const formData = new FormData();

  // Append the username and password to the FormData object
  for (const name in userData) {
    formData.append(name, userData[name]);
  }

  try {
    // Send a POST request to the login API endpoint
    const response = await fetch(`${baseUrl}user/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    // Parse the response data as JSON
    const data = await response.json();
    console.log("Login data:", data);
  } catch (error) {
    console.error("Error occurred during login:", error);
    throw new Error("Login failed");
  }
};



/**
 * Stores the user token in the localStorage
 * 
 * @param {Object} data - The data object should contain the user token
 * @param {function} next - A callback function
 */
export const authenticate = (token, next) => {
  // Check if the window object is defined (for client-side rendering)
  if (typeof window !== "undefined") {
    if (token) {
      // Store the token in the local storage
      localStorage.setItem("token", token);

      // Execute the callback function
      next();
    } else {
      // Log an error when the data object is not valid
      console.error("Invalid data object. Expected an object with a token property.")
    }
  }
};
  
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

export const logout = (next)=> {
    const userId = isAuthenticated() && isAuthenticated().user.user.id

    if (typeof window == "undefined"){
        localStorage.removeItem("token")
        cartEmpty(()=>{});
        next();

        return fetch(`${API}user/logout/${userId}`,)
        .then(response =>{
            console.log("Signout Success")
            next();
        })
        .catch(error => console.log(error))
    }
}
