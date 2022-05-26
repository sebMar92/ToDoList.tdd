const { Item } = require('../db.js');

const deleteItem = async (id) => {
  try {
    const deleted = await Item.destroy({ where: { id: id } });
    return Boolean(deleted);
  } catch (error) {
    return { msg: error };
  }
};
module.exports = deleteItem;
