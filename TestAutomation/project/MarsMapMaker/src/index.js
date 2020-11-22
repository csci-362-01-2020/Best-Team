import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/App';
import BrowserApp from './components/BrowserApp';
import reducer from './store/reducer';


ReactDOM.render(
    <Provider testID='Provider' store={createStore(reducer)}>
        <BrowserApp />
    </Provider>,
    document.querySelector('#root'));
export default App;
