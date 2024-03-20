const pool = require("../util/database");

class Model {
  db = pool;
  table = "";
  primary_key = "";

  createOne = async (table, values) => {
    return new Promise((resolve, reject) => {
      let sql = `INSERT INTO ${table} SET ?`;
      this.db.query(sql, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };

  getOne = async (table, field, value) => {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM ${table} WHERE ??=?`;
      this.db.query(sql, [field, value], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };

  getAll = async (table) => {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM ${table}`;
      this.db.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };

  updateOne = async (table, column, fields, value) => {
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

      this.db.query(sql, [...fieldValues, value], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };

  // updateOne = async (table, column, fields, value) => {
  //   return new Promise((resolve, reject) => {
  //     const fieldUpdates = Object.keys(fields)
  //       .map((field) => `\`${field}\` = ?`)
  //       .join(", ");
  //     const fieldValues = Object.values(fields);

  //     let sql = `
  //           UPDATE ${table}
  //           SET ${fieldUpdates}
  //           WHERE ${column} = ?;
  //       `;

  //     this.db.query(sql, [...fieldValues, value], (err, updateResult) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         // Fetch the updated record from the database
  //         let selectSql = `
  //                   SELECT *
  //                   FROM ${table}
  //                   WHERE ${column} = ?;
  //               `;
  //         this.db.query(selectSql, [value], (selectErr, selectResult) => {
  //           if (selectErr) {
  //             reject(selectErr);
  //           } else {
  //             resolve({ updateResult, updatedRecord: selectResult[0] });
  //           }
  //         });
  //       }
  //     });
  //   });
  // };

  deleteOne = async (table, field, value) => {
    return new Promise((resolve, reject) => {
      console.log(field, value);
      let sql = ` 
        DELETE FROM ${table} WHERE ?? = ?;
        `;

      this.db.query(sql, [field, value], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };
}

module.exports = Model;
