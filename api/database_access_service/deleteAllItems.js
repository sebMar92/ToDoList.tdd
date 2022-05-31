const { Item } = require('../db.js');

const deleteAllItems = async () => {
  try {
    const deleted = await Item.destroy({ where: {} });
    return Boolean(deleted);
  } catch (error) {
    return { msg: error };
  }
};
module.exports = deleteAllItems;
