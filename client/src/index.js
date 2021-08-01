import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import App from './App';
import axios from 'axios';

window.config = axios.get('/config').data;

const rootElement = document.getElementById('root');

Modal.setAppElement(rootElement);

ReactDOM.render(<App />, rootElement);
