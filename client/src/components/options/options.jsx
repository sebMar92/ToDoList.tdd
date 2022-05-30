import React, { useState } from 'react';
import CreateForm from '../createForm/createForm.jsx';
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
  return (
    <div id="options-wrapper">
      <div id="options-title">
        <h1>TDD-ToDoList</h1>
      </div>
      <div id="options-indent">
        <button
          className="option-btn"
          onClick={(e) => {
            createClickHandler(e);
          }}
        >
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
        <button className="option-btn">
          <span className="icon" id="icon3">
            #
          </span>{' '}
          Change style
        </button>
      </div>

      <CreateForm popCloser={popCloser} popup={popup} setListRender={setListRender} />
    </div>
  );
}
