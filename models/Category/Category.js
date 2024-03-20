const db = require("../../util/database");
const Model = require("../../core/Model");

class Category extends Model {
  table = "category";
  primary_key = "category_id";
}

module.exports = Category;
