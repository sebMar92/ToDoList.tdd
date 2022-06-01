import React from 'react';
import { deleteAll } from '../../services/index.js';

export default function ConfirmDeletion({ popup, popCloser, setListRender }) {
  function cancelClickHandler(e) {
    e.preventDefault();
    popCloser();
  }
  async function confirmClickHandler(e) {
    e.preventDefault();
    deleteAll();
    setListRender();
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
        <span htmlFor="create-input" id="descrpition-label">
          {'// Are you sure you want to delete ALL items?'}
        </span>
        <span>{'//'}</span>
        <div id="buttons-container">
          <span>{'//'}</span>
          <button className="form-btn" onClick={confirmClickHandler}>
            confirm
          </button>
          <button className="form-btn" onClick={cancelClickHandler}>
            cancel
          </button>
        </div>
        <span>{'//'}</span>
      </form>
    </div>
  );
}
