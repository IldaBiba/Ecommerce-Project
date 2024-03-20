const Model = require("../../core/Model");

class User extends Model {
  table = "user";
  primary_key = "user_id";

  getAllUser = async (table, condition) => {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM ${table} WHERE ${condition}`;
      this.db.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };

  updateUser = async (table, column, fields, value) => {
    return new Promise((resolve, reject) => {
      const fieldUpdates = Object.keys(fields)
        .map((field) => `\`${field}\` = ?`)
        .join(", ");
      const fieldValues = Object.values(fields);

      let sql = `
            UPDATE ${table}
            SET ${fieldUpdates}
            WHERE ${column} = ?;
        `;

      this.db.query(sql, [...fieldValues, value], (err, updateResult) => {
        if (err) {
          reject(err);
        } else {
          // Fetch the updated record from the database
          let selectSql = `
                    SELECT reset_token, reset_token_expiration
                    FROM ${table}
                    WHERE ${column} = ?;
                `;
          this.db.query(selectSql, [value], (selectErr, selectResult) => {
            if (selectErr) {
              reject(selectErr);
            } else {
              resolve({ updateResult, updatedRecord: selectResult[0] });
            }
          });
        }
      });
    });
  };
}
module.exports = User;
