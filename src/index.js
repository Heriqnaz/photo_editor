import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import configureStore from "./redux/configureStore";

const store = configureStore()

render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
