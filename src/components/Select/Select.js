import React from "react";

const SelectComponent = ({
  field,
  options,
  defaultValue,
  status,
  handleEditOrderStatus,
  order,
}) => {
  const handleChange = (event) => {
    if (options) {
      field.onChange(event.target.value);
    }
    if (status) {
      handleEditOrderStatus(order, event.target.value);
    }
  };

  return (
    <select
      {...field}
      onChange={handleChange}
      className="p-2 rounded form-control"
    >
      {options
        ? options.map((option) => (
            <option
              key={option.category_id}
              value={option.category_id}
              selected={option.category_id === defaultValue}
            >
              {option.name}
            </option>
          ))
        : status.map((option) => (
            <option
              key={option.status_id}
              value={option.status_id}
              selected={option.status_id === defaultValue}
            >
              {option.name}
            </option>
          ))}
    </select>
  );
};

export default SelectComponent;
