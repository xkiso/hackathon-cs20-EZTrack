function trackPackage() {
  
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  let carrier = document.getElementById('carrier').value;
  let tracking = document.getElementById('trackingNumber').value;
  let url = `https://api.shipengine.com/v1/tracking?carrier_code=${carrier}&tracking_number=${tracking}`;
  
  fetch(proxyurl + url, {
    method: 'GET',
    headers: {
      'api-key': 'ElJkhJuQIRoFq/kDEblco4LpZqRCdYNIoAVG7SywSXw',
    }
  })
  .then((response) => response.json())
  .then((data) => {
    let trackingNumber = data.tracking_number;
    let statusDescription = data.carrier_status_description;
    let estimateDelivery = data.estimated_delivery_date;
    let container = document.querySelector("#container")
    let div = document.createElement('div');
    div.innerHTML = `<p>${trackingNumber}: ${statusDescription}, ${estimateDelivery}</p>`;
    container.append(div);
  })
}

$(document).ready(function() {

  document.getElementById("submit").addEventListener("click", trackPackage);
  
  let container = document.querySelector("#container")
  let div = document.createElement('div');
  div.innerHTML = "<p>hello world!</p>"
  container.append(div);


});