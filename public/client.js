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
        findMaxValue(data);
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

// Hitta det maximala värdet av ett helt dataset för att klargöra vilken region som hade högst valdeltagande.
function findMaxValue(data){
  let largestValue = 0;
  let largestValueCode = null;
  for(let i = 0; i < data.data.length; i++){
    if(data.data[i].values[0] > largestValue){
      largestValue = data.data[i].values[0];
      largestValueCode = data.data[i].key[0];
    }
  }
  findRegion(largestValueCode);
}

// Hitta regionen baserat på nummret vi fick i den tidigare funktionen ovan.
function findRegion(code){
  let region = null;

  fetch(apiUrl, settings).then(function(res) {
    if (res.ok) {
      res.json().then(function(data) {
        console.log(data.variables[0]);
        for(let i = 0; i < data.variables[0].values.length; i++){
          if(data.variables[0].values[i] === code){
            region = data.variables[0].valueTexts[i];
          }
        }
        logResults(data, region, value);
      });
    } else {
      console.log("Response was not OK, instead got: ", res.status);
    }
    }).catch(function(e){
      if(e){
        throw new Error(e);
      }
  });

  finalRegion = region;
}

// Denna funktion hanterar utskrift av information.
function logResults(data, region, value){
  console.log(data.variables[0]);

  // Vi baserar produktionen på hur många valår det är, en enkel loop sköter detta.
  for(let i = 0; i<data.variables[2].values.length; i++){
    callInternalAPI(data.variables[2].values[i]);
    console.log(`Valår: ${data.variables[2].values[i]} | Region: ${finalRegion} | Procent: ${finalPercent}`);
  }
}

/* FÖRBÄTTRINGAR:
1. Hämta endast relevant information ifrån API:et istället för att hämta hem allt. På en liten skala gör detta inte något men ska det skalas upp kan det bli ett problem.
2. Ändra lite säkerhet så att om två regioner har likadana valdeltaganden så får de en delad plats.
*/