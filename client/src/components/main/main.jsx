import React, { useState } from 'react';
import Options from '../options/options.jsx';
import List from '../list/list.jsx';
import './main.css';

export default function Main() {
  const [hideCompleted, setHideCompleted] = useState(false);
  const [listRender, setListRender] = useState(true);
  return (
    <div id="main-wrapper">
      <Options setHideCompleted={setHideCompleted} setListRender={setListRender} />
      <List
        hideCompleted={hideCompleted}
        listRender={listRender}
        setListRender={setListRender}
      />
    </div>
  );
}
