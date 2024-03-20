const Model = require("../../core/Model");

class Product extends Model {
  table = "product";
  primary_key = "product_id";

  createOnePromise(table, values) {
    return new Promise((resolve, reject) => {
      this.createOne(table, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  getAllProducts = async (table, currentPage, recordsPerPage) => {
    return new Promise((resolve, reject) => {
      const offset = (currentPage - 1) * recordsPerPage;
      let sqlCount = `
            SELECT COUNT(*) AS total_count
            FROM ${table};
        `;
      let sqlData = `
            SELECT
                product.*,
                category.name AS category_name,
                JSON_ARRAYAGG(image.path) AS image_paths
            FROM
                ${table}
            JOIN
                category ON product.id_category = category.category_id
            LEFT JOIN
                image ON product.product_id = image.id_product_image
            GROUP BY
                product.product_id
            LIMIT ${recordsPerPage}
            OFFSET ${offset};
        `;
      this.db.query(sqlCount, (err, countResult) => {
        if (err) {
          reject(err);
        } else {
          const totalCount = countResult[0].total_count;
          this.db.query(sqlData, (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve({ results, totalCount });
            }
          });
        }
      });
    });
  };

  getOneProduct = async (table, field, value) => {
    return new Promise((resolve, reject) => {
      let sql = `
      SELECT
          product.*,
          category.name AS category_name,
          category.description AS category_description,
          JSON_ARRAYAGG(JSON_OBJECT('id', image.image_id, 'path', image.path)) AS images
      FROM
          ${table}
      JOIN
          category ON product.id_category = category.category_id
      LEFT JOIN
          image ON product.product_id = image.id_product_image
      WHERE
          ${field} = ?;
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

  getAverageRating = async (productId) => {
    return new Promise((resolve, reject) => {
      let sql = `
        SELECT AVG(rating_star) AS average_rating
        FROM review
        WHERE id_product_review = ?;
      `;
      this.db.query(sql, [productId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          // Extract the average rating from the results
          const averageRating = results[0].average_rating;
          resolve(averageRating);
        }
      });
    });
  };

  deleteOneProduct = async (table, field, value) => {
    return new Promise((resolve, reject) => {
      let sql = ` 
          DELETE FROM ${table} WHERE ?? = ?;
      `;
      this.db.query(sql, [field, value], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  getRelatedProduct = async (table, field, value) => {
    return new Promise((resolve, reject) => {
      let sql = `
          SELECT
              product.*,
              category.name AS category_name,
              category.description AS category_description,
              JSON_ARRAYAGG(JSON_OBJECT('id', image.image_id, 'path', image.path)) AS images
          FROM
              ${table}
          JOIN
              category ON product.id_category = category.category_id
          LEFT JOIN
              image ON product.product_id = image.id_product_image
          WHERE
              ${field} = ?
          GROUP BY
              product.product_id;
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

  getAllProductsByCategory = async (
    table,
    field,
    value,
    currentPage,
    recordsPerPage
  ) => {
    return new Promise((resolve, reject) => {
      const offset = (currentPage - 1) * recordsPerPage;
      let sqlCount = `
            SELECT COUNT(*) AS total_count
            FROM ${table}
            WHERE ${field} = ?;
        `;
      let sqlData = `
          SELECT
              product.*,
              category.name AS category_name,
              category.description AS category_description,
              JSON_ARRAYAGG(JSON_OBJECT('id', image.image_id, 'path', image.path)) AS images
          FROM
              ${table}
          JOIN
              category ON product.id_category = category.category_id
          LEFT JOIN
              image ON product.product_id = image.id_product_image
          WHERE
              ${field} = ?
          GROUP BY
              product.product_id
          LIMIT ${recordsPerPage}
          OFFSET ${offset};
      `;
      this.db.query(sqlCount, [value], (err, countResult) => {
        if (err) {
          reject(err);
        } else {
          const totalCount = countResult[0].total_count;
          const nPages = Math.ceil(totalCount / recordsPerPage);
          this.db.query(sqlData, [value], (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve({ results, totalCount, nPages });
            }
          });
        }
      });
    });
  };

  getProductsBySearch = async (table, search, currentPage, recordsPerPage) => {
    return new Promise((resolve, reject) => {
      const offset = (currentPage - 1) * recordsPerPage;
      const searchString = `%${search}%`;

      let sqlCount = `
        SELECT COUNT(*) AS total_count
        FROM ${table}
        WHERE product.title LIKE ?;
      `;

      let sqlData = `
        SELECT
          product.*,
          category.name AS category_name,
          JSON_ARRAYAGG(image.path) AS image_paths
        FROM
          ${table}
        JOIN
          category ON product.id_category = category.category_id
        LEFT JOIN
          image ON product.product_id = image.id_product_image
        WHERE
          product.title LIKE ? 
        GROUP BY
          product.product_id
        LIMIT ${recordsPerPage}
        OFFSET ${offset};
      `;

      this.db.query(sqlCount, [searchString], (err, countResult) => {
        if (err) {
          reject(err);
        } else {
          const totalCount = countResult[0].total_count;

          this.db.query(sqlData, [searchString], (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve({ results, totalCount });
            }
          });
        }
      });
    });
  };

  decreaseStock = async (productId, quantity) => {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE product
        SET stock = stock - ?
        WHERE product_id = ?
      `;
      this.db.query(sql, [quantity, productId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  getTopSelling = async () => {
    const sql = `
    SELECT 
      oi.orderproduct_id, 
      p.title AS productTitle,
      SUM(oi.quantity) AS totalQuantity,
      SUM(oi.quantity * oi.price_order) AS totalRevenue,
      AVG(oi.price_order) AS unitPrice
    FROM 
      orderitem oi
    JOIN
      product p ON oi.orderproduct_id = p.product_id
    GROUP BY 
      oi.orderproduct_id, p.title
    ORDER BY 
      totalQuantity DESC
    LIMIT 5;`;

    return new Promise((resolve, reject) => {
      this.db.query(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };
}

module.exports = Product;
