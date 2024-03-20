import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BiHide, BiShow } from "react-icons/bi";
import axios from "axios";
import url from "../../apiUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditProfileForm = () => {
  const { register, handleSubmit, errors, getValues } = useForm();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const toggleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleShowConfirmNewPassword = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(`${url}user/edit-profile`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response.data.success) {
        toast(response.data.message);
        navigate("/user-profile");
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <div className="container" style={{ height: "70vh" }}>
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-md-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 shadow bg-white rounded"
          >
            <div className="mb-3">
              <label htmlFor="username" className="form-label mb-2">
                Username
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors?.username ? "is-invalid" : ""
                }`}
                id="username"
                {...register("username", {
                  required: "Username is required",
                })}
              />
              {errors?.username && (
                <div className="invalid-feedback">
                  {errors.username.message}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label mb-2">
                Email
              </label>
              <input
                type="email"
                className={`form-control ${errors?.email ? "is-invalid" : ""}`}
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors?.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="currentPassword" className="form-label mb-2">
                Current Password
              </label>
              <div className="input-group">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  className={`form-control ${
                    errors?.currentPassword ? "is-invalid" : ""
                  }`}
                  id="currentPassword"
                  {...register("currentPassword", {
                    required: "Current password is required",
                  })}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={toggleShowCurrentPassword}
                >
                  {showCurrentPassword ? <BiHide /> : <BiShow />}
                </button>
              </div>
              {errors?.currentPassword && (
                <div className="invalid-feedback">
                  {errors.currentPassword.message}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label mb-2">
                New Password
              </label>
              <div className="input-group">
                <input
                  type={showNewPassword ? "text" : "password"}
                  className={`form-control ${
                    errors?.newPassword ? "is-invalid" : ""
                  }`}
                  id="newPassword"
                  {...register("newPassword", {
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  })}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={toggleShowNewPassword}
                >
                  {showNewPassword ? <BiHide /> : <BiShow />}
                </button>
              </div>
              {errors?.newPassword && (
                <div className="invalid-feedback">
                  {errors.newPassword.message}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="confirmNewPassword" className="form-label mb-2">
                Confirm New Password
              </label>
              <div className="input-group">
                <input
                  type={showConfirmNewPassword ? "text" : "password"}
                  className={`form-control ${
                    errors?.confirmNewPassword ? "is-invalid" : ""
                  }`}
                  id="confirmNewPassword"
                  {...register("confirmNewPassword", {
                    validate: (value) =>
                      value === getValues("newPassword") ||
                      "The passwords do not match",
                  })}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={toggleShowConfirmNewPassword}
                >
                  {showConfirmNewPassword ? <BiHide /> : <BiShow />}
                </button>
              </div>
              {errors?.confirmNewPassword && (
                <div className="invalid-feedback">
                  {errors.confirmNewPassword.message}
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileForm;
