const { Item } = require('../db.js');

const editItemName = async (id, newName) => {
  try {
    const foundItem = await Item.findOne({ where: { id: id } });
    if (foundItem) {
      foundItem.name = newName;
      await foundItem.save();
    }
    return foundItem;
  } catch (error) {
    return { msg: error };
  }
};
module.exports = editItemName;
