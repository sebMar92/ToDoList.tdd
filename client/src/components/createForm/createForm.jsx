import React, { useState } from 'react';
import './createForm.css';
import { createItem } from '../../services/index.js';

export default function CreateForm({ popup, popCloser, setListRender }) {
  const [text, setText] = useState('');
  const [redBorder, setRedBorder] = useState(false);

  function handleInputChange(e) {
    setText(e.target.value);
  }
  function cancelClickHandler(e) {
    e.preventDefault();
    popCloser();
  }
  async function confirmClickHandler(e) {
    e.preventDefault();
    if (text) {
      await createItem(text);
      setListRender((listRender) => !listRender);
      setText('');
      popCloser();
    } else {
      setRedBorder(true);
      setTimeout(() => {
        setRedBorder(false);
      }, 600);
    }
  }
  return (
    <div id="greyout" className={popup ? '' : 'hidden'}>
      <form id="form-wrapper" onSubmit={confirmClickHandler}>
        <div id="x-container">
          <span>{'//'}</span>
          <button className="form-btn" id="x-btn" onClick={cancelClickHandler}>
            X
          </button>
        </div>
        <span>{'//'}</span>
        <label htmlFor="create-input" id="descrpition-label">
          {'// type a description:'}
        </label>
        <input
          type="text"
          id="create-input"
          className={redBorder ? 'redBorder' : ''}
          onChange={handleInputChange}
          value={text}
        />
        <span>{'//'}</span>
        <div id="confirm-container">
          <span>{'//'}</span>
          <button type="submit" className="form-btn" onSubmit={confirmClickHandler}>
            confirm
          </button>
        </div>
        <span>{'//'}</span>
      </form>
    </div>
  );
}
