const db = require("../../util/database");

const Model = require("../../core/Model");

class Cart extends Model {
  table = "cart";
  primary_key = "cart_id";

  updateCart = async (table, cartValue, value) => {
    return new Promise((resolve, reject) => {
      let sql = `UPDATE ${table}
        SET id_user = ?
        WHERE cart_id = ?`;
      this.db.query(sql, [value, cartValue], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
}

module.exports = Cart;
