document.addEventListener('DOMContentLoaded', function() {
  let activeSwitch = document.getElementById('activeSwitch')
  let wageInput = document.getElementById('wageInput')

  chrome.storage.sync.get('active', function(data) {
    activeSwitch.checked = data.active;
  });

  chrome.storage.sync.get('wage', function(data) {
    console.log(data);
    wageInput.value = data.wage;
  });

  activeSwitch.addEventListener("click",function(){
      chrome.storage.sync.set({'active': activeSwitch.checked});
  });

})


function setActive() {
  let hourlyWage = document.getElementById('wageInput')

  /*
    chrome.storage.sync.get('active', function(data) {
      //let activeSwitch = document.getElementById('activeSwitch')
      //activeSwitch.checked = data.active;
      console.log(data);
    });*/

  //chrome.storage.sync.set("active",active.checked)
  console.log(active.checked)
  console.log(hourlyWage.value)
}
