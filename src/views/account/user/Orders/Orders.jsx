import { useEffect } from "react";
import UseGetOrders from "./UseGetOrders";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Accordion, Card, Button, Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

const Orders = () => {
  const { fetchData, orders, cancelOrder, statusOrder } = UseGetOrders();

  useEffect(() => {
    fetchData();
  }, [statusOrder]);

  console.log(orders);
  return (
    <Container className="mt-5">
      <Row xs={1} md={2} className="g-4">
        {orders.map((order) => (
          <Col key={order.order_id}>
            <Card>
              <Card.Body>
                <Card.Title>Order ID: {order.order_id}</Card.Title>
                <Card.Text>
                  <strong>Order Status:</strong> {order.status_name}
                  <br />
                  <strong>City:</strong> {order.city}
                  <br />
                  <strong>Phone Number:</strong> {order.phone_number}
                  <br />
                  <strong>Address:</strong> {order.address}
                  <br />
                  <strong>Payment Method:</strong> {order.payment_method}
                </Card.Text>
                <div className="d-flex flex-wrap">
                  {order.orderItems.map((item) => (
                    <div
                      key={item.orderitem_id}
                      className="d-flex align-items-center m-2"
                    >
                      <img
                        src={`http://localhost:3001/${item.path}`}
                        alt={item.title}
                        style={{
                          maxHeight: "150px",
                          maxWidth: "150px",
                          objectFit: "cover",
                          marginRight: "10px",
                        }}
                      />
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <h5>{item.title}</h5>
                        <p>
                          <strong>Quantity:</strong> {item.quantity}
                          <br />
                          <strong>Price:</strong> ${item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="d-flex justify-content-between">
                  {order.status_name !== "canceled" &&
                    order.status_name !== "returned" &&
                    order.status_name !== "accepted" && (
                      <>
                        {order.status_name === "delivered" ? (
                          <Button
                            variant="danger"
                            onClick={() =>
                              cancelOrder(
                                "returned",
                                order.order_id,
                                order.created_at
                              )
                            }
                          >
                            Return
                          </Button>
                        ) : (
                          <Button
                            variant="danger"
                            onClick={() =>
                              cancelOrder(
                                "canceled",
                                order.order_id,
                                order.created_at
                              )
                            }
                          >
                            Cancel
                          </Button>
                        )}
                      </>
                    )}

                  {order.status_name === "canceled" ||
                    (order.status_name === "returned" && (
                      <>
                        <Button className="d-none "></Button>
                        <Button className="d-none"></Button>
                      </>
                    ))}

                  {order.status_name === "accepted" ? null : <div></div>}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default Orders;
