// chrome.runtime.onInstalled.addListener(function() {
//     chrome.storage.sync.set({color: '#3aa757'}, function() {
//       console.log('The color is green.');
//     });
//     chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//       chrome.declarativeContent.onPageChanged.addRules([{
//         conditions: [new chrome.declarativeContent.PageStateMatcher({
//           pageUrl: {urlMatches: '.*'},
//         })
//         ],
//             actions: [new chrome.declarativeContent.RequestContentScript({
//                 "js": ["payload.js"]
//             })]
//       }]);
//     });
//   });


// // // Inject the payload.js script into the current tab after the popout has loaded
// window.addEventListener('load', function (evt) {
//     chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
//             file: 'payload.js'
//     });;
// });

// // Listen to messages from the payload.js script and write to popout.html
chrome.runtime.onMessage.addListener(function (images) {
    images.forEach(image => {
        console.log(image);
    });
});