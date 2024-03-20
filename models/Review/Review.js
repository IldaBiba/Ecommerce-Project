const Model = require("../../core/Model");

class Reviews extends Model {
  getReviewsByProductId = async (productId) => {
    return new Promise((resolve, reject) => {
      let sql = `
            SELECT review.*, user.username
            FROM review
            INNER JOIN user ON review.id_user_review = user.user_id
            WHERE id_product_review = ?;
            `;
      this.db.query(sql, [productId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };
}

module.exports = Reviews;
