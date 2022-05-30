const { Item } = require('../db.js');

const getAllItems = async () => {
  try {
    const allItems = await Item.findAll({ order: [['id', 'ASC']] });
    return allItems;
  } catch (error) {
    return { msg: error };
  }
};
module.exports = getAllItems;
