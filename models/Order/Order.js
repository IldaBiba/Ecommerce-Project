const db = require("../../util/database");
const Model = require("../../core/Model");

class Order extends Model {
  createOrder = async (table, values) => {
    return new Promise((resolve, reject) => {
      let sql = `INSERT INTO \`${table}\` SET ?`; // Enclose table name in backticks
      this.db.query(sql, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };
  getAllOrders = async (user_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const orders = await this.getOrdersByUserId(user_id);

        const ordersWithItems = await Promise.all(
          orders.map(async (order) => {
            const orderItems = await this.getOrderItemsByOrderId(
              order.order_id
            );
            return { ...order, orderItems };
          })
        );

        resolve(ordersWithItems);
      } catch (error) {
        reject(error);
      }
    });
  };

  getOrdersByUserId = async (user_id) => {
    return new Promise((resolve, reject) => {
      const sql = `
      SELECT o.*, s.name AS status_name
      FROM \`order\` o
      JOIN status s ON o.order_status = s.status_id
      WHERE o.id_order_user = ?
    `;
      this.db.query(sql, [user_id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };

  getOrderItemsByOrderId = async (order_id) => {
    return new Promise((resolve, reject) => {
      const sql = `with image as (
        select * from image
        group by id_product_image
        order by 1 desc
        )
        select * from orderitem
        join  product ON orderitem.orderproduct_id = product.product_id
        LEFT JOIN image ON product.product_id = image.id_product_image 
        WHERE orderitem.id_order = ?`;
      this.db.query(sql, [order_id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };

  getAllOrdersAdmin = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        // Fetch all orders
        const orders = await this.getAllOrdersWithUserInfo();

        // Fetch order items for each order
        const ordersWithItems = await Promise.all(
          orders.map(async (order) => {
            const orderItems = await this.getOrderItemsByOrderId(
              order.order_id
            );
            return { ...order, orderItems };
          })
        );

        resolve(ordersWithItems);
      } catch (error) {
        reject(error);
      }
    });
  };

  getAllOrdersWithUserInfo = async () => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT o.*, u.username, u.email, s.name AS status_name
        FROM \`order\` o
        JOIN user u ON o.id_order_user = u.user_id
        JOIN status s ON o.order_status = s.status_id
      `;
      this.db.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };

  updateStatus = async (table, column, fieldName, fieldValue, value) => {
    return new Promise((resolve, reject) => {
      let sql = `
            UPDATE \`${table}\`
            SET \`${fieldName}\` = ?
            WHERE \`${column}\` = ?;
          `;

      this.db.query(sql, [fieldValue, value], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };

  updateOrder = async (table, column, fields, value) => {
    return new Promise((resolve, reject) => {
      const fieldUpdates = Object.keys(fields)
        .map((field) => `\`${field}\` = ?`)
        .join(", ");
      const fieldValues = Object.values(fields);

      let sql = `
            UPDATE \`${table}\`
            SET ${fieldUpdates}
            WHERE \`${column}\` = ?;
        `;

      this.db.query(sql, [...fieldValues, value], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };

  getOrderById = async (order_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const order = await this.getOrderDetailsById(order_id);

        const orderItems = await this.getOrderItemsByOrderId(order_id);
        console.log(orderItems);

        resolve({ order, orderItems });
      } catch (error) {
        reject(error);
      }
    });
  };

  getOrderDetailsById = async (order_id) => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT o.*, s.name AS status_name
        FROM \`order\` o
        JOIN status s ON o.order_status = s.status_id
        WHERE o.order_id = ?
      `;
      this.db.query(sql, [order_id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]); // Assuming there's only one order with the given ID
        }
      });
    });
  };

  getOrderSalesRevenue = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const orders = await this.getAllOrders(); // Implement this method to fetch all orders

        let totalOrders = 0;
        let totalRevenue = 0;

        for (const order of orders) {
          totalOrders++;

          const orderItems = await this.getOrderItemsByOrderId(order.order_id); // Implement this method to fetch order items by order ID

          let orderRevenue = 0;
          for (const item of orderItems) {
            orderRevenue += item.price * item.quantity;
          }

          totalRevenue += orderRevenue;
        }

        resolve({ totalOrders, totalRevenue });
      } catch (error) {
        reject(error);
      }
    });
  };
}

module.exports = Order;
