// apikey: 36DdV7a4Ka1tyr8VyrGz
// 
// Search example api call https://api.winnipegtransit.com/v3/streets:portage.json?&api-key=36DdV7a4Ka1tyr8VyrGz&usage=long
// Example stops api call https://api.winnipegtransit.com/v3/stops.json?street=2716&api-key=36DdV7a4Ka1tyr8VyrGz&usage=long
// Stop route example call https://api.winnipegtransit.com/v3/stops/10131/schedule.json?api-key=36DdV7a4Ka1tyr8VyrGz&usage=long

/**Your completed app will allow users to search for bus schedules by street name. A search term is entered into a text input and the search is executed
 *  once the user presses the enter key. 
 *  Connecting to the Winnipeg Transit Data API, the search will return a list of STREETS that match the search query. 
 *  Clicking on any of the streets in the returned list will display the next buses, for each route, at all the stops on a the selected street. 
 * 
 * recap: 
 * STREETS get STOPS get BUSES
 * 
 */
const defaultURL = `https://api.winnipegtransit.com/v3/`;
const searchType = {
  street : 'streets:',
  schedule : 'stops/',
  streetStops : 'stops.json?street=',
}
const parameters = '&usage=long';
const searchTerm = 'corydon';


 document.querySelector("input").addEventListener("keydown", function(e){
  if(e.code === 'Enter' || e.code === 'NumpadEnter'){
    e.preventDefault();
    console.log(e.target.value);
    getStreets(e.target.value);
  }

});

const getStreets = async(searchTerm) => {
  const response = await fetch(`${defaultURL}${searchType.street}${searchTerm}.json&apikey=${APIKey}${parameters}`);
  console.log(response);
  const data = await response.json();
  if(response.status !== 200) {
    throw new Error(`Status ${response.status}`);
  }
  return data;
}
