const deleteAllItems = require('../database_access_service/deleteAllItems.js');

const deleteAll = async (req, res) => {
  try {
    const deleted = await deleteAllItems();
    if (deleted.hasOwnProperty('msg')) {
      return res.status(400).json({ error: deleted.msg });
    }
    if (deleted) {
      return res.status(204).json({ msg: 'Items deleted' });
    } else {
      return res.status(404).json({ error: 'There are no items to delete' });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = deleteAll;
