import React, { useEffect, useState } from 'react';
import './list.css';
import { deleteItem, editItem, getItems } from '../../services/index.js';

export default function List({ hideCompleted, listRender, setListRender }) {
  const [items, setItems] = useState([]);
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
  return (
    <div id="list-wrapper">
      {items.length ? (
        items.map((item) => {
          return (
            <div key={item.id} className={hideCompleted && item.completed && 'hidden'}>
              <span
                id={item.id}
                className={`checkbox ${item.completed ? 'checked' : 'unchecked'}`}
                onClick={(e) => {
                  changeCompleted(e);
                }}
              >
                {item.completed ? '✓' : '✗'}
              </span>
              <span> {item.name}</span>
            </div>
          );
        })
      ) : (
        <span>There's no to-do item yet</span>
      )}
    </div>
  );
}
