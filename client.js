const apiUrl = "http://api.scb.se/OV0104/v1/doris/sv/ssd/START/ME/ME0104/ME0104D/ME0104T4";

// Enkelt GET request till API:et i fråga, tar emot datan och skickar det vidare för utskrift.
fetch(apiUrl).then(function(res) {
  if (res.ok) {
    // Om API:et inte formaterar med JSON så gör vi det själva nedanför.
    res.json().then(function(data) {
      logResults(data);
    });
  } else {
    // Om förfrågan inte går igenom då printar vi ut ett meddelande samt statuskoden för requestet, detta är endast för utvecklaren och ej nödvändigt.
    console.log("Response was not OK, instead got: ", res.status);
  }
  // Även ett catch block här om nu förfrågan inte går igenom.
  }).catch(function(e){
    if(e){
      throw new Error("Error!");
    }
});

// Denna funktion hanterar utskrift av information.
function logResults(d){
  console.log(d);
  console.log(d.variables[0]);

  // Vi baserar produktionen på hur många valår det är, en enkel loop sköter detta.
  for(let i = 0; i<d.variables[2].values.length; i++){
    console.log(`${d.variables[2].text}: ${d.variables[2].values[i]} | asd`);
  }
}