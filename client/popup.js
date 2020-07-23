function trackPackage() {
  
  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  let tracking = document.getElementById('trackingNumber');
  let trackingNumbers = document.getElementById('trackingNumber').value;
  tracking.value = "";
  let result = document.querySelector("#result");
  result.innerHTML = "";

  // remove spaces
  trackingNumbers = trackingNumbers.replace(/\s/g, '').split(",");
  console.log(trackingNumbers);

  // regex patterns for service
  let upsPatt = /^(\d{9})$|1[zZ].*/;
  let uspsPatt = /^\d{20,22}$/;
  let fedexPatt = /^\d{12,15}$/;

  trackingNumbers.forEach( (trackingNumber) => {
    let carrierId =
      upsPatt.test(trackingNumber) ? 'ups' :
      uspsPatt.test(trackingNumber) ? 'usps' :
      fedexPatt.test(trackingNumber) ? 'fedex' : null;
  
    fetch(proxyurl + `https://api.shipengine.com/v1/tracking?carrier_code=${carrierId}&tracking_number=${trackingNumber}`, {
      method: 'GET',
      headers: {
        'api-key': 'ElJkhJuQIRoFq/kDEblco4LpZqRCdYNIoAVG7SywSXw',
      }
    })
    .then((response) => response.json())
    .then((data) => {
      let div = document.createElement('div');
      result.append(div);

      let str = "";

      str += `<h2>${data.tracking_number}</h2>
      <h4>Your package is: ${data.status_description}</h4>`;

      let packageStatus;
      switch (data.status_code) {
        case 'AC':
          packageStatus += 'https://giffiles.alphacoders.com/569/5694.gif';
          break;
        case 'AC':
          packageStatus += 'https://giffiles.alphacoders.com/569/5694.gif';
          break;
        case 'AC':
          packageStatus += 'https://giffiles.alphacoders.com/569/5694.gif';
          break;
        case 'AC':
          packageStatus += 'https://giffiles.alphacoders.com/569/5694.gif';
          break;      
      }

      if (data.status_code == 'AC') {
        
      } else if (data.status_code === 'IT') { // In Transit
        packageStatus = 'https://i.gifer.com/77ST.gif';
      } else if (data.status_code == 'DE') { // Delivered
        packageStatus = "https://thumbs.gfycat.com/MindlessWeirdCottontail-size_restricted.gif";
      } else if (data.status_code == 'UN') { // Unknown
        packageStatus = 'https://thumbs.gfycat.com/VacantJoyousBlackpanther-size_restricted.gif';
      } else if (data.status_code == 'AT') {
        packageStatus += 'https://thumbs.gfycat.com/TautActiveHusky-size_restricted.gif';
      }
      
      str += `<img class="packageStatus" src="${packageStatus}"></img>`;
      str += `<h4>Current Status:
        <br>${data.carrier_status_description}, ${data.estimated_delivery_date || ""}</h4>`;
      
      div.innerHTML = str;

      div = document.createElement('div');
      div.id = 'arrow';
      result.append(div);

      div = document.createElement('div');
      div.className = 'eventContainer';
      result.append(div);
      str = "";
      (data.events).forEach( (value) => {
        str += `<p class="transitEvents">${value.description} in ${value.city_locality}, ${value.state_province} at ${value.carrier_occurred_at.replace('T', ' ')}</p>`;
      });
      div.innerHTML = str;
    })
    .catch((err) => {
      result.innerHTML = "<p>Invalid entry. Please try again.</p>"
    });
  });
}

$(document).ready(function() {
  document.getElementById("submit").addEventListener("click", trackPackage);
});