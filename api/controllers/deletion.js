const deleteItem = require('../database_access_service/deleteItem.js');

const deletion = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteItem(id);
    if (deleted.hasOwnProperty('msg')) {
      return res.status(400).json({ error: deleted.msg });
    }
    if (deleted) {
      return res.status(204).json({ msg: 'Item deleted' });
    } else {
      return res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = deletion;
