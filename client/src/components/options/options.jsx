import React, { useState } from 'react';
import CreateForm from '../createForm/createForm.jsx';
import { deleteAll } from '../../services/index.js';
import './options.css';

export default function Options({ setHideCompleted, setListRender }) {
  const [hide, setHide] = useState(false);
  const [popup, setPopup] = useState(false);
  function popCloser() {
    setPopup(false);
  }
  function createClickHandler(e) {
    e.preventDefault();
    setPopup(true);
  }
  async function deleteHandler(e) {
    e.preventDefault();
    await deleteAll();
    setListRender((listRender) => !listRender);
  }
  return (
    <div id="options-wrapper">
      <div id="options-title-wrapper">
        <h1 id="options-title">ToDoList.tdd</h1>
      </div>
      <div id="options-indent">
        <button className="option-btn" onClick={createClickHandler}>
          <span className="icon" id="icon1">
            +
          </span>{' '}
          Create item
        </button>
        <button
          className="option-btn"
          onClick={() => {
            setHide(!hide);
            setHideCompleted((hideCompleted) => !hideCompleted);
          }}
        >
          <span className="icon" id="icon2">
            -
          </span>{' '}
          {hide ? 'Show completed' : 'Hide completed'}
        </button>
        <button className="option-btn" onClick={deleteHandler}>
          <span className="icon" id="icon3">
            #
          </span>{' '}
          Delete all
        </button>
      </div>

      <CreateForm popCloser={popCloser} popup={popup} setListRender={setListRender} />
    </div>
  );
}
