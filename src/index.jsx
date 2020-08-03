import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './redux/configureStore';

import App from './App';

import './index.css';

const store = configureStore();

render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
