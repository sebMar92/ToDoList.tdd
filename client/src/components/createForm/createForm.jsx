import React, { useState } from 'react';
import './createForm.css';
import { createItem } from '../../services/index.js';

export default function CreateForm({ popup, popCloser, setListRender }) {
  const [text, setText] = useState('');
  function handleInputChange(e) {
    setText(e.target.value);
  }
  function cancelClickHandler(e) {
    e.preventDefault();
    popCloser();
  }
  async function confirmClickHandler(e) {
    e.preventDefault();
    await createItem(text);
    setListRender((listRender) => !listRender);
    popCloser();
  }
  return (
    <div id="greyout" className={popup ? '' : 'hidden'}>
      <form id="form-wrapper">
        <div id="x-container">
          <span>{'//'}</span>
          <button className="form-btn" id="x-btn" onClick={cancelClickHandler}>
            X
          </button>
        </div>
        <span>{'//'}</span>
        <label htmlFor="description" id="descrpition-label">
          {'// type a description:'}
        </label>
        <input
          type="text"
          id="create-input"
          onChange={(e) => handleInputChange(e)}
          value={text}
        />
        <span>{'//'}</span>
        <div id="confirm-container">
          <span>{'//'}</span>
          <button className="form-btn" onClick={confirmClickHandler}>
            confirm
          </button>
        </div>
        <span>{'//'}</span>
      </form>
    </div>
  );
}
