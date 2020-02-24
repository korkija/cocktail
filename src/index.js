import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import {AppContainer} from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {store} from "./stor/store";

ReactDOM.render(
    <Provider store={store}>
        <AppContainer/>
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();
