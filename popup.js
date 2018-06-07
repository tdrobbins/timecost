document.addEventListener('DOMContentLoaded', function() {
  let activeSwitch = document.getElementById('activeSwitch')
  let wageInput = document.getElementById('wageInput')

  chrome.storage.sync.get('active', function(data) {
    activeSwitch.checked = data.active;
  });

  chrome.storage.sync.get('wage', function(data) {
    wageInput.value = data.wage;
  });

  activeSwitch.addEventListener("click",function(){
      chrome.storage.sync.set({'active': activeSwitch.checked});
  });

  wageInput.addEventListener("input", function(){
     chrome.storage.sync.set({"wage": wageInput.value});
  });
})
