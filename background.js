// Notify content script that the Browser Action has been clicked
chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log("Browser Action clicked");
        chrome.tabs.sendMessage(tabs[0].id, {action: "describe_images"}, function(response) {
            console.log(response);
        });
    });
});