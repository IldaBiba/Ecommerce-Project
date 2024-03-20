import React from "react";
import useSignUp from "./UseSignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const { register, handleSubmit, errors, onSubmit } = useSignUp();

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
              className="p-4 shadow bg-white rounded"
            >
              <h3 className="text-center mb-4 mt-4">Sign Up</h3>
              {/* ... SignUp form content ... */}
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  id="username"
                  placeholder="Username"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
                {errors.username && (
                  <div className="invalid-feedback">
                    {errors.username.message}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
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
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  id="password"
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password.message}
                  </div>
                )}
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-lg">
                  Sign Up
                </button>
              </div>
              <p className="forgot-password text-right mt-3">
                Already registered? <a href="/sign-in">Sign in</a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
