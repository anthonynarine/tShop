/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";

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

  let signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-ligh">Name</label>
              <input
                className="form-control"
                value={name}
                onChange={handleChange("name")}
                type="text"
              />
            </div>
            <div className="form-group">
              <label className="text-ligh">Email</label>
              <input
                className="form-control"
                value={email}
                onChange={handleChange("email")}
                type="text"
              />
            </div>
            <div className="form-group">
              <label className="text-ligh">Password</label>
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
    <Base title="Sign up page" description="create your account">
      {signUpForm()}
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
