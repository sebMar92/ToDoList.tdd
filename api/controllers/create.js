const createItem = require('../database_access_service/createItem.js');

const create = async (req, res) => {
  try {
    const { name } = req.body;
    if (name && typeof name !== 'string') {
      return res.status(404).json({ error: 'name value must be a string' });
    } else {
      const createdItem = await createItem(name);
      if (!createdItem.hasOwnProperty('error')) {
        return res.status(201).json(createdItem);
      } else {
        return res.status(400).json();
      }
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = create;
