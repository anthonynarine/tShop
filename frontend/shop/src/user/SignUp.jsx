/* eslint-disable no-lone-blocks */
import React, { useState } from "react";
import { API } from "../backend";
import Base from "../core/Base";

function SignUp() {
  //State
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  //destructure values ( instead of useing values.email etc)
  const { name, email, password, error, success } = values;

  //    * Higher order function that handles input changes for the SignUp component.
  //    * Updates the state values based on the input field name.
  //    * @param {string} name - The name of the input field.
  //    * @param {object} event - The event object triggered by the input field.
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const register = async (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, success: false });
    try {
      // Send a POST request to the signup API endpoint
      const response = await fetch("http://localhost:8000/api/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      // Parse the response data as JSON
      const data = await response.json();
      console.log("Data:", data);
      setValues({ ...values, success: true });
    } catch (error) {
      console.error("Error occurred during signup:", error);
      setValues({...values, error: 'Signup Failed: Ensure a valid Name, Email and Password was provided'})
    }
  };

  let signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form onSubmit={register}>
            <div className="form-group">
              <label className="text-ligh">Name*</label>
              <input
                className="form-control"
                value={name}
                onChange={handleChange("name")}
                type="text"
              />
            </div>
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
              <button className="btn btn-success w-100">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Create Account" description="create your account">
      {error && <div className="alert alert-danger text-center w-50 col-md-6 offset-sm-3 text-left ">{error}</div>}
      {success && <div className="alert alert-success text-center w-50 col-md-6 offset-sm-3 text-left ">Signup successful!</div>}
      {signUpForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
}

export default SignUp;

// NOTES
//  dynamic keys
{
  /*In JavaScript object literal syntax, square brackets are used to
define a dynamic key. When you want to assign a value to a property
whose key is determined dynamically, you need to enclose the key
name in square brackets.

In the context of the handleChange function, the
name parameter represents the name of the input field.
By using [name] as the key, you can dynamically assign the 
corresponding value to that key in the values object.

For example, if name is "email",
the expression ...values, [name]: event.target.value is equivalent
to { ...values, email: event.target.value }. It updates the email
property in the values object with the new value obtained from 
the input field.

So, in this case, the square brackets are necessary to
correctly assign the value to the dynamically determined key.
*/
}

// Notes on setValues funtion and the Error

{
  /*event.preventDefault(): This is used to prevent the default 
form submission behavior, which would cause a page refresh or
navigation when the form is submitted. We want to handle the
form submission with our custom logic, so we prevent the default behavior.

setValues({ ...values, error: false, success: false }): This line
is resetting the error and success fields in the values state
to false before the signup process starts. By doing this,
we ensure that any previous error or success messages are 
cleared before the new signup attempt.

try and catch block: The try block contains the asynchronous
code that sends a POST request to the signup API endpoint.
If the request is successful, the catch block is skipped,
and the code inside the try block for handling a successful
response is executed. If the request encounters an error 
(e.g., due to a network issue or server error), the control
goes to the catch block.

setValues({ ...values, error: "Signup failed" }): Inside the catch 
block, we handle the error condition by updating the error field in
the values state to display the "Signup failed" message to the user.
We use the spread operator (...values) to copy all the existing fields 
from the values state and then set the error field to "Signup failed."

By using setValues in the register function, we are able to update 
the state of the component based on the outcome of the signup process. 
This allows us to provide feedback to the user, display appropriate error
 messages, and reset the form fields after a signup attempt.
*/
}
