import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Cart from "../cart/Cart";
import UseCheckout from "./UseGetCheckout";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { useCart } from "../../Context/CartContext";

const Checkout = () => {
  const {
    register,
    handleSubmit,
    errors,
    checkoutSubmit,
    getShippingMethods,
    shippingMethods,
  } = UseCheckout();

  const { cart } = useCart();

  const [shippingValue, setShippingValue] = useState(null);

  useEffect(() => {
    getShippingMethods();
  }, []);

  console.log(shippingMethods);
  console.log(cart.length);

  return (
    <div className="container mt-4 mb-5">
      <h2 className="mb-4">Checkout</h2>
      <div className="row">
        <div className="col-md-7 col-lg-7">
          <form
            onSubmit={handleSubmit(checkoutSubmit)}
            className="p-4 shadow bg-white rounded"
          >
            <div className="mb-4">
              <h3>Billing Information</h3>
              <div className="mb-3">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  {...register("city", {
                    required: "City is required",
                  })}
                  className="form-control"
                />
                {errors.city && (
                  <p className="text-danger">{errors.city.message}</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                  })}
                  className="form-control"
                />
                {errors.phoneNumber && (
                  <p className="text-danger">{errors.phoneNumber.message}</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address:
                </label>
                <textarea
                  {...register("address", {
                    required: "Address is required",
                  })}
                  className="form-control"
                />
                {errors.address && (
                  <p className="text-danger">{errors.address.message}</p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <h3>Payment Information</h3>
              <div className="mb-3">
                <label htmlFor="paymentMethod" className="form-label">
                  Payment Method:
                </label>
                <div className="form-check">
                  <input
                    type="radio"
                    id="creditCard"
                    {...register("paymentMethod", {
                      required: "Payment method is required",
                    })}
                    className="form-check-input"
                    value="creditCard"
                  />
                  <label className="form-check-label" htmlFor="creditCard">
                    Credit Card
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    id="bankTransfer"
                    {...register("paymentMethod", {
                      required: "Payment method is required",
                    })}
                    className="form-check-input"
                    value="bankTransfer"
                  />
                  <label className="form-check-label" htmlFor="bankTransfer">
                    Bank Transfer
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    id="checkMoneyOrder"
                    {...register("paymentMethod", {})}
                    className="form-check-input"
                    value="checkMoneyOrder"
                  />
                  <label className="form-check-label" htmlFor="checkMoneyOrder">
                    Check/Money Order
                  </label>
                </div>
                {errors.paymentMethod && (
                  <p className="text-danger">{errors.paymentMethod.message}</p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <h3>Shipping Method</h3>
              <div className="mb-3">
                <label htmlFor="shippingMethod" className="form-label">
                  Shipping Method:
                </label>
                {shippingMethods.map((method) => (
                  <div className="form-check" key={method.shipping_id}>
                    <input
                      type="radio"
                      id={method.shipping_id}
                      {...register("shippingMethod", {
                        required: "Shipping method is required",
                      })}
                      className="form-check-input"
                      value={method.shipping_id}
                      onClick={() => {
                        const parsedShippingValue = parseFloat(
                          method.constante
                        );
                        setShippingValue(parsedShippingValue);
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={method.shipping_ID}
                    >
                      {method.method}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Complete Purchase
            </button>
          </form>
        </div>

        <div className="col-md-5 col-lg-5">
          <div className="p-4 shadow bg-white rounded">
            <h3>Cart</h3>

            <Cart checkout={true} shippingValue={shippingValue} />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Checkout;
