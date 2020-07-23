function trackPackage() {
  
  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  let trackingNumbers = document.getElementById('trackingNumber').value;
  document.getElementById('trackingNumber').value = "";
  
  let result = document.querySelector("#result");
  result.innerHTML = "";

  // remove spaces & split between commas
  trackingNumbers = trackingNumbers.replace(/\s/g, '').split(",");

  trackingNumbers.forEach( (trackingNumber) => {
    let carrierId = getCarrierId(trackingNumber);
    
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
      
      // Tracking Number & Description
      str += `<h2>${data.tracking_number}</h2>
      <h4>Your package is: ${data.status_description}</h4>`;
      
      // Gif Image
      let packageStatus = getPackageStatus(data.status_code);
      str += `<img class="packageStatus" src="${packageStatus}"></img>`;
      
      // Current Status Description
      // let date = data.estimated_delivery_date;
      // if (date) {
      //   date = date.replace(/[TZ]/g, ' ');
      // }
      str += `<h4>Current Status:
        <br>${data.carrier_status_description}</h4>`;
      
      // Estimated Delivery Date
      if (data.estimated_delivery_date)
        str += `<h4>Estimated Delivery Date:
          <br>${data.estimated_delivery_date.replace(/[TZ]/g, " ")}</h4>`;

      div.innerHTML = str;

      let mainDiv = document.createElement('div');
      result.append(mainDiv);
      div = document.createElement('div');
      div.id = 'arrow';
      mainDiv.append(div);

      div = document.createElement('div');
      div.className = 'eventContainer';
      mainDiv.append(div);
      str = "";
      (data.events).forEach( (value) => {
        date = value.carrier_occurred_at;
        if (date)
          date = 'at ' + date.replace(/[TZ]/g, " ");
        str += `<p class="transitEvents">${value.description} in ${value.city_locality}, ${value.state_province} ${date || ""}</p>`;
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

function getCarrierId(trackingNumber) {
  // regex patterns for service
  let upsPatt = /^(\d{9})$|1[zZ].*/;
  let uspsPatt = /^\d{20,22}$/;
  let fedexPatt = /^\d{12,15}$/;

  return upsPatt.test(trackingNumber) ? 'ups' :
    uspsPatt.test(trackingNumber) ? 'usps' :
    fedexPatt.test(trackingNumber) ? 'fedex' : 'error';
}

function getPackageStatus(statusCode) {
  console.log(statusCode);
  switch (statusCode) {
    case 'AC':
      return 'https://giffiles.alphacoders.com/569/5694.gif';
    case 'IT':
      return 'https://i.gifer.com/77ST.gif';
    case 'DE':
      return 'https://thumbs.gfycat.com/MindlessWeirdCottontail-size_restricted.gif';
    case 'UN':
      return 'https://thumbs.gfycat.com/VacantJoyousBlackpanther-size_restricted.gif';
    case 'AT':
      return 'https://thumbs.gfycat.com/TautActiveHusky-size_restricted.gif'; 
    case 'NY':
      return 'https://media.tenor.com/images/6f58c9612f0e3b6520b76a8a47d5d91d/tenor.gif';
    default:
      return 'https://media2.giphy.com/media/3o6ZtqprcPDOkDru5W/giphy.gif';
  };
}