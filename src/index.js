import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {StoreContextProvider} from './store/use-context'
import {Provider} from 'react-redux'
import {store} from './redux/store'
ReactDOM.render(
  <Provider store={store}>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </Provider>,
  document.getElementById('root')
  );