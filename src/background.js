import { CLICKED_BROWSER_ACTION } from './helpers/commonConstants';

chrome.browserAction.onClicked.addListener((tab) => {
    //sends message to active tab
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {
            message: CLICKED_BROWSER_ACTION
        });
    });
});