const getItem = require('../database_access_service/getItem.js');

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await getItem(id);
    if (item) {
      return res.status(200).json(item);
    } else {
      return res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = getById;
