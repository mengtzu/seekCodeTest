import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store/createStore';
import App from './App/App';

const context = {};

export default ({ path }) => {
    return (`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>SEEK</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" type="text/css" href="/style.css" />
    </head>
    <body>
      <div id="app">${renderToString(
        <Provider store={store}>
            <StaticRouter context={context} location={{ pathname: path }}>
                <App />
            </StaticRouter>
        </Provider>
    )}</div>
      <script type="text/javascript" src="/main.js"></script>
    </body>
  </html>
`)

};