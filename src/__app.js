/*global chrome*/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { CLICKED_BROWSER_ACTION } from './helpers/commonConstants';

const appEl = document.createElement('div');
appEl.id = 'sample-extension-root';
appEl.style.display = 'none';

function __toggle() {
    if(appEl.style.display === 'none') {
        appEl.style.display = 'block';
    } else {
        appEl.style.display = 'none';
    }
}

chrome.runtime.onMessage.addListener((req, sender) => {
    if (req && req.message !== CLICKED_BROWSER_ACTION) return;

    __toggle();
})

document.body.appendChild(appEl);
ReactDOM.render(<App />, appEl);