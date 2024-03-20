import UseGetReset from "./UseGetReset";

const Reset = () => {
  const { register, handleSubmit, errors, onSubmit } = UseGetReset();
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
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Reset;
