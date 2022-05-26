const { Item } = require('../db.js');

const createItem = async (name) => {
  try {
    const createdItem = await Item.create({ name: name });
    return createdItem;
  } catch (error) {
    return { error: error.message };
  }
};
module.exports = createItem;
