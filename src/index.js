import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './index.scss';
import App from './App';
import rootReducer from './store/reducers/rootReducer';

const store = createStore(rootReducer);

// const app = (
//     <BrowserRouter>
//         <App />
//     </BrowserRouter>
// );

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));