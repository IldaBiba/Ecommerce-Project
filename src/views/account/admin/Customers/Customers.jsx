import { useEffect } from "react";
import UseGetCustomers from "./UseGetCustomers";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";

const Customers = () => {
  const allCustomers = useSelector((state) => state.customer);
  console.log(allCustomers);
  const { fetchData, customers } = UseGetCustomers();
  useEffect(() => {
    fetchData();
  }, []);

  console.log(customers);

  return (
    <div>
      {allCustomers.loading && <LoadingSpinner />}
      <h1>Customers List</h1>
      <table className="table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {allCustomers.customer &&
            allCustomers.customer.map((customer) => (
              <tr key={customer.user_id}>
                <td>{customer.user_id}</td>
                <td>{customer.username}</td>
                <td>{customer.email}</td>
                <td>{new Date(customer.created_at).toLocaleString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
