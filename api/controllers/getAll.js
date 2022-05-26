const getAllItems = require('../database_access_service/getAllItems.js');

const getAll = async (req, res) => {
  try {
    const items = await getAllItems();
    return res.status(200).json(items);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = getAll;
