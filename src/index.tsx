import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { store } from './redux';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
