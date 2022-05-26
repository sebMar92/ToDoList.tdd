const { Item } = require('../db.js');

const getAllItems = async () => {
  try {
    const allItems = await Item.findAll();
    return allItems;
  } catch (error) {
    return { msg: error };
  }
};
module.exports = getAllItems;
