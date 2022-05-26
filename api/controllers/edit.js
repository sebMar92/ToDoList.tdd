const editItemCompletion = require('../database_access_service/editItemCompletion.js');
const editItemName = require('../database_access_service/editItemName.js');
const getItem = require('../database_access_service/getItem.js');

const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, changeCompleted } = req.body;
    const item = await getItem(id);
    if (item) {
      if (!name && !changeCompleted) {
        return res.status(422).json({
          error:
            "The request body doesn't have either 'name' nor 'changeCompleted' in it.",
        });
      }
      if (name) {
        await editItemName(id, name);
      }
      if (changeCompleted) {
        await editItemCompletion(id);
      }
      await item.reload();
      return res.status(200).json(item);
    } else {
      return res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = edit;
