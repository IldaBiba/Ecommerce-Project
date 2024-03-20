const Model = require("../../core/Model");
const db = require("../../util/database");

class CartItem extends Model {
  table = "cartitem";
  primary_key = "cartitem_id";

  // getCartItems = async (table, field, value, callback) => {
  //   let sql = `
  //       SELECT cartitem.*, product.*
  //       FROM ${table}
  //       JOIN product ON cartitem.cartproduct_id = product.product_id
  //       WHERE ${field} = ?
  //     `;
  //   this.db.query(sql, [value], callback);
  // };

  // updateCartItem = async (
  //   table,
  //   fieldToUpdate,
  //   updatedValue,
  //   field1,
  //   value1,
  //   field2,
  //   value2,
  //   callback
  // ) => {
  //   let sql = `
  //       UPDATE ${table}
  //       SET ${fieldToUpdate} = ?
  //       WHERE ${field1} = ? AND ${field2} = ?
  //   `;
  //   this.db.query(sql, [updatedValue, value1, value2], callback);
  // };

  getCartItems = async (table, field, value) => {
    return new Promise((resolve, reject) => {
      let sql = `
            SELECT cartitem.*, product.*
            FROM ${table}
            JOIN product ON cartitem.cartproduct_id = product.product_id
            WHERE ${field} = ?
        `;
      this.db.query(sql, [value], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };
  getSingleCartItem = async (table, fields, values) => {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM ${table} WHERE ?? = ? AND ?? = ?`;
      // Concatenate field-value pairs into a single array
      const params = [...fields, ...values];
      this.db.query(sql, params, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };

  // getCartItems = async (table, field, value) => {
  //   return new Promise((resolve, reject) => {
  //     let sql = `
  //           SELECT cartitem.*, product.title AS product_title, product.price AS product_price
  //           FROM ${table}
  //           JOIN product ON cartitem.cartproduct_id = product.product_id
  //           WHERE ${field} = ?
  //       `;
  //     this.db.query(sql, [value], (err, results) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         // Map the results to format each cart item with associated product details
  //         const cartItems = results.map((row) => ({
  //           cartItemId: row.cartitem_id,
  //           productId: row.cartproduct_id,
  //           quantity: row.quantity,
  //           product: {
  //             productId: row.product_id,
  //             title: row.product_title,
  //             price: row.product_price,
  //             // Add more product details as needed
  //           },
  //         }));
  //         resolve(cartItems);
  //       }
  //     });
  //   });
  // };

  updateCartItem = async (
    table,
    fieldToUpdate,
    updatedValue,
    field1,
    value1,
    field2,
    value2
  ) => {
    return new Promise((resolve, reject) => {
      let sql = `
            UPDATE ${table}
            SET ${fieldToUpdate} = ?
            WHERE ${field1} = ? AND ${field2} = ?
        `;
      this.db.query(sql, [updatedValue, value1, value2], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };

  deleteCartItem = async (table, value, field) => {
    return new Promise((resolve, reject) => {
      const sql = `
        DELETE FROM ${table}
        WHERE ${field}= ?
      `;
      this.db.query(sql, [value], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };
}

module.exports = CartItem;
