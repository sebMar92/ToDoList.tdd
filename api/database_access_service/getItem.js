const { Item } = require('../db.js');

const getItem = async (id) => {
  try {
    const foundItem = await Item.findOne({ where: { id: id } });
    return foundItem;
  } catch (error) {
    console.log(error.message);
    return { error: error.message };
  }
};
module.exports = getItem;
