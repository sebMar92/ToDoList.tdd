const { Item } = require('../db.js');

const deleteIAllItems = async () => {
  try {
    const deleted = await Item.destroy();
    return Boolean(deleted);
  } catch (error) {
    return { msg: error };
  }
};
module.exports = deleteIAllItems;
