document.addEventListener('DOMContentLoaded', function() {
  let urlInput = document.getElementById('urlInput');

  chrome.storage.sync.get('activeSites', function(data) {
    urlInput.value = data['activeSites'].join('\n');
  });
});
