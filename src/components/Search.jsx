import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const role = localStorage.getItem("role");

  const handleInputChange = (event) => {
    event.preventDefault();
    const searchQuery = event?.target?.search?.value;
    if (role === "admin") {
      navigate(`/admin/products?search=${searchQuery}`);
    } else {
      navigate(`/home?search=${searchQuery}`);
    }
  };

  return (
    <form className="search" onSubmit={handleInputChange}>
      <div className="input-group">
        <input
          id="search"
          name="search"
          type="text"
          className="form-control"
          placeholder="Search"
          required
        />
        <label className="visually-hidden" htmlFor="search"></label>
        <button
          className="btn btn-primary text-white"
          type="submit"
          aria-label="Search"
        >
          <i className="bi bi-search"></i>
        </button>
      </div>
    </form>
  );
};
export default Search;
