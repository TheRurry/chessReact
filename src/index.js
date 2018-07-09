import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';
import { observe } from './Game';

const rootEl = document.getElementById('root');

observe(chess =>
  ReactDOM.render(
    <Board chess={chess} />,
    rootEl
  )
);