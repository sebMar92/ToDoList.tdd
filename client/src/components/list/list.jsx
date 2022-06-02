import React, { useEffect, useRef, useState } from 'react';
import './list.css';
import { deleteItem, editItem, getItems } from '../../services/index.js';

export default function List({ hideCompleted, listRender, setListRender }) {
  const [items, setItems] = useState([]);
  const [isHover, setIsHover] = useState(false);
  const [enableEdit, setEnableEdit] = useState(false);
  const itemsRef = useRef([]);
  const inputRef = useRef([]);

  useEffect(() => {
    const asyncGetItems = async () => {
      const allItems = await getItems();
      setItems(allItems);
    };
    asyncGetItems();
  }, [listRender]);
  async function changeCompleted(e) {
    await editItem({ id: e.target.id, changeCompleted: true });
    setListRender((listRender) => !listRender);
  }
  function editHandler(id) {
    setEnableEdit(id);
    inputRef[id].focus();
  }
  async function deleteHandler(id) {
    await deleteItem(id);
    setListRender((listRender) => !listRender);
  }
  function inputChanger(e, id) {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          item.name = e.target.value;
        }
        return item;
      })
    );
  }
  function confirmItemEdition(e, id) {
    setEnableEdit(false);
    editItem({ id: id, name: e.target.value });
  }
  return (
    <div id="list-wrapper">
      {items && items.length ? (
        hideCompleted && !items.find((item) => item.completed === false) ? (
          <span>All your items are done!</span>
        ) : (
          items.map((item) => {
            return (
              <div
                key={item.id}
                className={`list-item-container ${
                  hideCompleted && item.completed ? 'hidden' : ''
                }`}
                onMouseEnter={() => setIsHover(item.id)}
                onMouseLeave={() => setIsHover(false)}
              >
                <span
                  id={item.id}
                  className={`checkbox ${item.completed ? 'checked' : 'unchecked'}`}
                  onClick={changeCompleted}
                >
                  {item.completed ? '✓' : '✗'}
                </span>
                <input
                  className={`list-item ${enableEdit === item.id ? 'editable' : ''}`}
                  ref={(ref) => (inputRef[item.id] = ref)}
                  value={item.name}
                  onChange={(e) => inputChanger(e, item.id)}
                  readOnly={enableEdit !== item.id}
                  onDoubleClick={() => setEnableEdit(item.id)}
                  onBlur={(e) => confirmItemEdition(e, item.id)}
                />
                <div
                  ref={(ref) => (itemsRef[item.id] = ref)}
                  className={isHover === item.id ? '' : 'hidden'}
                >
                  <button className="list-buttons" onClick={() => editHandler(item.id)}>
                    {' '}
                    Edit
                  </button>
                  <button className="list-buttons" onClick={() => deleteHandler(item.id)}>
                    {' '}
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )
      ) : (
        <span>There's no to-do item yet</span>
      )}
    </div>
  );
}
