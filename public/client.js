const apiUrl = "http://api.scb.se/OV0104/v1/doris/sv/ssd/ME/ME0104/ME0104D/ME0104T4";

let settings = {
  method: "GET",
}

// Enkelt GET request till API:et i fråga, tar emot datan och skickar det vidare för utskrift.
fetch(apiUrl, settings).then(function(res) {
  if (res.ok) {
    // Om API:et inte formaterar med JSON så gör vi det själva nedanför.
    res.json().then(function(data) {
      //logResults(data);
    });
  } else {
    // Om förfrågan inte går igenom då printar vi ut ett meddelande samt statuskoden för requestet, detta är endast för utvecklaren och ej nödvändigt.
    console.log("Response was not OK, instead got: ", res.status);
  }
  // Även ett catch block här om nu förfrågan inte går igenom.
  }).catch(function(e){
    if(e){
      throw new Error(e);
    }
});

function callInternalAPI(year){
  fetch(`/api/${year}`, settings).then(function(res) {
    if (res.ok) {
      // Om API:et inte formaterar med JSON så gör vi det själva nedanför.
      res.json().then(function(data) {
        //logResults(data);
        console.log(data);
      });
    } else {
      // Om förfrågan inte går igenom då printar vi ut ett meddelande samt statuskoden för requestet, detta är endast för utvecklaren och ej nödvändigt.
      console.log("Response was not OK, instead got: ", res.status);
    }
    }).catch(function(e){
      if(e){
        throw new Error(e);
      }
  });
}

callInternalAPI(2014);

// Denna funktion hanterar utskrift av information.
function logResults(d, v){
  console.log(d);
  console.log(d.variables[0]);

  // Vi baserar produktionen på hur många valår det är, en enkel loop sköter detta.
  for(let i = 0; i<d.variables[2].values.length; i++){
    //callInternalAPI(d.variables[2].values[i]);
    console.log(`Valår: ${d.variables[2].values[i]} | Region: ${d.variables[2].values[i]} | Procent: ${d.variables[2].values[i]}`);
  }
}

/* FÖRBÄTTRINGAR:
1. Hämta endast relevant information ifrån API:et istället för att hämta hem allt. På en liten skala gör detta inte något men ska det skalas upp kan det bli ett problem.
2. 

*/