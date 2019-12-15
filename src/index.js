import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from "react-router-dom";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css'
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducer from "./reducer";
const store = createStore(
    reducer,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension && process.env.NODE_ENV !== "production"
        ? window.devToolsExtension()
        : f => f
    )
  );
  ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
        <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
