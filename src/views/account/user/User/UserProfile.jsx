import React, { useEffect } from "react";
import { Button } from "react-bootstrap"; // Import Bootstrap Button component
import UseGetUser from "./UseGetUser";
import Orders from "../Orders/Orders";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { fetchData, handleButtonClick } = UseGetUser();
  const user = useSelector((state) => state?.user?.user);
  console.log(user);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "grid",
        minHeight: "100vh",
        gridTemplateRows: "auto 1fr auto",
      }}
    >
      <div className="container mt-5 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h2>My Profile</h2>
            <Button onClick={handleButtonClick}>Edit Profile</Button>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <strong>Name:</strong>

              {user && user.username}
            </div>
            <div className="mb-3">
              <strong>Email:</strong> {user && user.email}
            </div>
            <div className="border-top pt-3">
              <h3>Order History</h3>
              <h6 style={{ color: "red" }}>
                <strong>Reminder!</strong> You can only return or cancel your
                order 1 week after its creation or delivery.
              </h6>

              <Orders />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
