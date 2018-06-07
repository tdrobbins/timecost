chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({
    'active': true,
    'wage': 10,
    'activeSites': ["amazon.com"]
  });
});
