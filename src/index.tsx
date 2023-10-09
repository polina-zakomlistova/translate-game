import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import './styles/index.scss';
import App from './App';
import StoreContext from './context/store';
import { injectStores } from '@mobx-devtools/tools';

import rootStore from './store';

const store = new rootStore();

injectStores({
    store,
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Router>
        <StoreContext.Provider value={store}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </StoreContext.Provider>
    </Router>
);
