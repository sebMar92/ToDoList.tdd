const { Item } = require('../db.js');

const editItemCompletion = async (id) => {
  try {
    const foundItem = await Item.findOne({ where: { id: id } });
    if (foundItem) {
      foundItem.completed = !foundItem.completed;
      await foundItem.save();
    }
    return foundItem;
  } catch (error) {
    return { msg: error };
  }
};
module.exports = editItemCompletion;
