const { Schema, model } = require('mongoose');

const SubCategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
});

module.exports = model('SubCategory', SubCategorySchema);
