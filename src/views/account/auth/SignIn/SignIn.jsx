import React from "react";
import useSignIn from "./UseSignIn";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const SignIn = () => {
  const { register, handleSubmit, errors, onSubmit } = useSignIn();

  return (
    <div>
      <div
        className="container mt-5 mb-5"
        style={{
          minHeight: "60vh",
          gridTemplateRows: "auto 1fr auto",
        }}
      >
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-4 shadow-lg bg-white rounded"
            >
              <h3 className="text-center mb-4 mt-4">Sign In</h3>
              <div className="mb-3">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  id="email"
                  placeholder="Enter email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  id="password"
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password.message}
                  </div>
                )}
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Sign In
                </button>
              </div>
              <p className="forgot-password text-right mt-3">
                <Link to="/reset"> Forgot password?</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
