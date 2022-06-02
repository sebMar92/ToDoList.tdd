const getAllItems = require('../database_access_service/getAllItems.js');
const createItem = require('../database_access_service/createItem.js');
const getItem = require('../database_access_service/getItem.js');
const editItemName = require('../database_access_service/editItemName.js');
const editItemCompletion = require('../database_access_service/editItemCompletion.js');
const deleteItem = require('../database_access_service/deleteItem.js');
const deleteAllItems = require('../database_access_service/deleteAllItems.js');

const { conn } = require('../db.js');

describe('getAllItems', () => {
  it('should return an empty array when there are no items', async () => {
    await conn.sync({ force: true });
    const allItems = await getAllItems();
    expect(allItems).toEqual([]);
  });
  it('should return an array of objects when there are items in the db, each object should have a name (string), id (number) and completed (boolean)', async () => {
    await createItem('test 1');
    await createItem('test 2');
    const allItems = await getAllItems();
    expect(allItems).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          completed: expect.any(Boolean),
        }),
      ])
    );
  });
});

describe('createItem', () => {
  it('should create an item in the database', async () => {
    await conn.sync({ force: true });
    const previousItem = await getAllItems();
    await createItem('test my app');
    const currentItem = await getAllItems();
    expect(currentItem.length - previousItem.length).toEqual(1);
  });
  it("should return the created item with it's name, id and 'completed' set to false", async () => {
    const createdItem = await createItem('test my app again');
    expect(createdItem).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: 'test my app again',
        completed: false,
      })
    );
  });
});

describe('getItem', () => {
  it("should return a specific item by it's id", async () => {
    const foundItem = await getItem(1);
    expect(foundItem).toEqual(
      expect.objectContaining({
        id: 1,
        name: 'test my app',
        completed: false,
      })
    );
  });
  it("should return null if the item doesn't exist", async () => {
    const notFound = await getItem(99999);
    expect(notFound).toEqual(null);
  });
});

describe('editItemName', () => {
  it('should edit the name of the item with the given id', async () => {
    await editItemName(1, 'keep testing my app');
    const changedItem = await getItem(1);
    expect(changedItem.name).toBe('keep testing my app');
  });
  it('should return the edited item', async () => {
    const changedItem = await editItemName(2, 'test the app again');
    expect(changedItem.name).toEqual('test the app again');
  });
  it("should return null if the item doesn't exist", async () => {
    const changedItem = await editItemName(99999, 'find if this item exists');
    expect(changedItem).toBe(null);
  });
});

describe('editItemCompletion', () => {
  it("should change the item's completion to the opposite", async () => {
    let changedItem = await editItemCompletion(1);
    expect(changedItem.completed).toBe(true);
    changedItem = await editItemCompletion(1);
    expect(changedItem.completed).toBe(false);
  });
  it('should return the edited item', async () => {
    const changedItem = await editItemCompletion(1);
    expect(changedItem).toEqual(
      expect.objectContaining({ id: 1, name: 'keep testing my app', completed: true })
    );
  });
  it("should return null if the item doesn't exist", async () => {
    const changedItem = await editItemName(99999);
    expect(changedItem).toBe(null);
  });
});

describe('deleteItem', () => {
  it('should delete the item from the database', async () => {
    await deleteItem(1);
    const remainingItems = await getAllItems();
    const deletedItem = remainingItems.find((item) => item.id === 1);
    expect(deletedItem).toBe(undefined);
  });
  it('should return true if the item was deleted', async () => {
    const deleted = await deleteItem(2);
    expect(deleted).toBe(true);
  });
  it("should return false if the item doesn't exist", async () => {
    const deleted = await deleteItem(99999);
    expect(deleted).toBe(false);
  });
});

describe('deleteAllItems', () => {
  it('should delete all items from the database', async () => {
    await deleteAllItems();
    const remainingItems = await getAllItems();
    expect(remainingItems).toEqual([]);
  });
  it('should return true if the items were deleted', async () => {
    await createItem('test my app');
    const deleted = await deleteAllItems();
    expect(deleted).toBe(true);
  });
  it('should return false if there are no items to delete', async () => {
    const deleted = await deleteAllItems();
    expect(deleted).toBe(false);
  });
});
