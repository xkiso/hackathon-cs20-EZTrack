function trackPackage() {
  
  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  let tracking = document.getElementById('trackingNumber');
  let trackingNumber = document.getElementById('trackingNumber').value;
  
  // remove spaces
  trackingNumber = trackingNumber.replace(/\s/g, '');
  console.log(trackingNumber);

  // regex patterns for service
  let upsPatt = /^(\d{9})$|1[zZ].*/;
  let uspsPatt = /^\d{20,22}$/;
  let fedexPatt = /^\d{12,15}$/;

  let carrierId =
    upsPatt.test(trackingNumber) ? 'ups' :
    uspsPatt.test(trackingNumber) ? 'usps' :
    fedexPatt.test(trackingNumber) ? 'fedex' : null;
  
  let url = `https://api.shipengine.com/v1/tracking?carrier_code=${carrierId}&tracking_number=${trackingNumber}`;

  tracking.value = "";
  let result = document.querySelector("#result");
  result.innerHTML = "";

  fetch(proxyurl + url, {
    method: 'GET',
    headers: {
      'api-key': 'ElJkhJuQIRoFq/kDEblco4LpZqRCdYNIoAVG7SywSXw',
    }
  })
  .then((response) => response.json())
  .then((data) => {
    let str = `<h2>${data.tracking_number}</h2>
    <h4>${data.carrier_status_description}, ${data.estimated_delivery_date || ""}</h4>`;
    (data.events).forEach( (value) => {
      str += `<p>${value.description} in ${value.city_locality}, ${value.state_province} at ${value.carrier_occurred_at}<p>`;
    });
    result.innerHTML = str;
  })
  .catch((err) => {
    let result = document.querySelector("#result");
    result.innerHTML = "<p>Invalid entry. Please try again.</p>"
  });
}

$(document).ready(function() {
  document.getElementById("submit").addEventListener("click", trackPackage);
});