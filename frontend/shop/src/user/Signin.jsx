import React, { useState } from "react";
import Base from "../core/Base";
import { Link, useNavigate } from "react-router-dom";


function SignIn() {

    const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    success: false,
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, success, loading, didRedirect } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  async function login(event) {
    event.preventDefault();
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
          Signup successful!{" "}
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            Login
          </Link>
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
      {signInForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
}

export default SignIn;
