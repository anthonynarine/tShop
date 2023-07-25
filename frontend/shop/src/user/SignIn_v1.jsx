import React, { useState } from "react";
import Base from "../core/Base";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../core/shared";
import { useAuth } from "../core/helper/AuthContext_v1";


function SignIn() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    success: false,
    loading: false,
  });

  // Destructure the values state for convenience
  const { email, password, error, success, loading } = values;

  // Function to handle changes in form input fields

  const handleChange = (keyName) => (event) => {
    setValues({ ...values, error: false, [keyName]: event.target.value });
  };


  // Access the dispatch function using the custom hook useAuth (see AuthContext)
  const { dispatch} = useAuth(); // WITH CUSTOM HOOK
  const navigate = useNavigate();

  // Function to handle the login request
  async function login(event) {
    event.preventDefault();
    // Set loading to true before making the API request
    setValues({ ...values, error: false, loading: true });

    try {
      const formData = new FormData();
      // Append the email and password to the FormData object
      // name is the name of the key || will only add the form input value keys
      for (const name in values) {
        formData.append(name, values[name]);
      }

      // TEST Log the keys present in formData
      for (const key of formData.keys()) {
        console.log("NAME OF KEY ADDED", key); //..TEST
      }

      const response = await fetch(`${baseUrl}/api/user/login/`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();
      console.log("Server Response Data:", data); //..TEST
      console.log("Token:", data.token); //..TEST
      console.log("UserID:", data.user.id); //..TEST
      //Stores the token that comes with the user object as the token value in initial state
      if (data.token && data.user.id) {
        console.log("Inside if block: Condition met, data.token and data.user.id exist"); //TEST
        dispatch({ type: "AUTHENTICATE", payload: data.token, userId: data.user.id });
        //Toggles isAuthenticated from false to true in initial state
        // Store the user ID in the context (assuming 'data.user.id' contains the user ID)
        // dispatch({ type: "SET_USER_ID", payload: data.user.id });
        dispatch({ type: "SET_AUTHENTICATED", payload: true });
      } else {
        console.log("Missing token or userId in response data"); //..TEST
      }

      // Clear form data upon successful login
      // setValues({ email: "", password: "", error: "", loading: false, success: true });
      // console.log("CART_STATE_UPDATED:", cart)
      // navigate("/");
    } catch (error) {
      console.error(error);
      // Set loading to false and success to false in case of error
      setValues({ ...values, loading: false, success: false });
    }
  }


  // Function to render the error message
  const errorMessage = () => {
    if (error) {
      return (
        <div className="alert alert-danger text-center w-50 col-md-6 offset-sm-3 text-left">
          {error}
        </div>
      );
    }
    return null;
  };

  // Function to render the success message
  const successMessage = () => {
    if (success) {
      return (
        <div className="alert alert-success text-center w-50 col-md-6 offset-sm-3 text-left">
          Login successful!{" "}
          {/* <Link to={"/login"} style={{ textDecoration: "none" }}>
            Login
          </Link> */}
        </div>
      );
    }
    return null;
  };

  let signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form onSubmit={login}>
            <div className="form-group">
              <label className="text-ligh">Email*</label>
              <input
                className="form-control"
                value={email}
                onChange={handleChange("email")}
                type="text"
              />
            </div>
            <div className="form-group">
              <label className="text-ligh">Password*</label>
              <input
                className="form-control"
                value={password}
                onChange={handleChange("password")}
                type="password"
              />
            </div>
            <div className="py-4">
              <button className="btn btn-success w-100">Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Signin page" description="the place you signin">
      {errorMessage()}
      {successMessage()}
      {signInForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
}

export default SignIn;
