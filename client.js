const apiUrl = "http://api.scb.se/OV0104/v1/doris/sv/ssd/START/ME/ME0104/ME0104D/ME0104T4";


fetch(apiUrl).then(function(res) {
  if (res.ok) {
    res.json().then(function(data) {
      console.log(data);
    });
  } else {
    console.log("Response was not OK, instead got: ", res.status);
  }
  }).catch(function(e){
    if(e){
      throw new Error("Error!");
    }
  });
