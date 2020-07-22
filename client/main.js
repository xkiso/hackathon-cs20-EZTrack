$(document).ready(function() {

  let container = document.querySelector("#container")
  let div = document.createElement('div');
  div.innerHTML = "<p>hello world!</p>"
  container.append(div);

  
  let carrier = "ups";
  let tracking = "1ZA407020374824050";
  let url = `https://api.shipengine.com/v1/tracking?carrier_code=${carrier}&tracking_number=${tracking}`;
  fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'api-key': 'ElJkhJuQIRoFq/kDEblco4LpZqRCdYNIoAVG7SywSXw',
    },
    // mode: 'no-cors'    
  })
  .then((data) => data.json())
  .then((response) => {
    console.log(response)
  })
});