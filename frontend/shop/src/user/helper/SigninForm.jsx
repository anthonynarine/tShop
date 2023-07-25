function SignInForm({ signin, values, handleChange }) {
  const { email, password } = values;

  const handleInputChange = (keyName) => (event) => {
    handleChange(keyName)(event); // Call the handleChange prop from the parent component
  };

  return (
    <div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
        <form onSubmit={signin}>
          <div className="form-group">
            <label className="text-ligh">Email*</label>
            <input
              className="form-control"
              value={email}
              onChange={handleInputChange("email")}
              type="text"
            />
          </div>
          <div className="form-group">
            <label className="text-ligh">Password*</label>
            <input
              className="form-control"
              value={password}
              onChange={handleInputChange("password")}
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
}

export default SignInForm;
