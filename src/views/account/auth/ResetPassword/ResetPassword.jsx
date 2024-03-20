import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UseGetResetPassword from "./UseGetResetPassword";

const ResetPassword = () => {
  const { register, handleSubmit, errors, getValues, onSubmit } =
    UseGetResetPassword();

  console.log("hey");
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
              <h3 className="text-center mb-4 mt-4">Reset Password</h3>
              <div className="mb-3">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.newPassword ? "is-invalid" : ""
                  }`}
                  id="newPassword"
                  placeholder="Enter new password"
                  {...register("newPassword", {
                    required: "New password is required",
                  })}
                />
                {errors.newPassword && (
                  <div className="invalid-feedback">
                    {errors.newPassword.message}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.confirmPassword ? "is-invalid" : ""
                  }`}
                  id="confirmPassword"
                  placeholder="Confirm new password"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === getValues("newPassword") ||
                      "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback">
                    {errors.confirmPassword.message}
                  </div>
                )}
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
