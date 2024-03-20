const Model = require("../../core/Model");

class Image extends Model {
  table = "image";
  primary_key = "image_id";
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
}

module.exports = Image;
