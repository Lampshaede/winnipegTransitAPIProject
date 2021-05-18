// apikey: 36DdV7a4Ka1tyr8VyrGz
// 
// Search street ex. call https://api.winnipegtransit.com/v3/streets:portage.json?&api-key=36DdV7a4Ka1tyr8VyrGz&usage=long
// Stop list by street call https://api.winnipegtransit.com/v3/stops.json?street=2716&api-key=36DdV7a4Ka1tyr8VyrGz&usage=long
// Schedule/Route Api Call https://api.winnipegtransit.com/v3/stops/10131/schedule.json?api-key=36DdV7a4Ka1tyr8VyrGz&usage=long

/**Your completed app will allow users to search for bus schedules by street name. A search term is entered into a text input and the search is executed
 *  once the user presses the enter key. 
 *  Connecting to the Winnipeg Transit Data API, the search will return a list of STREETS that match the search query. 
 *  Clicking on any of the streets in the returned list will display the next buses, for each route, at all the stops on a the selected street. 
 * 
 * recap: 
 * STREETS get STOPS get BUSES
 * 
 */
const APIKey = '36DdV7a4Ka1tyr8VyrGz';
const defaultURL = `https://api.winnipegtransit.com/v3/`;
const searchType = {
  street : 'streets:', // by street query string as text
  streetStops : 'stops', // by street ID
  schedule : 'stops/', // by stop ID
}
const streetsList = document.querySelector(".streets");
const parameters = '&usage=long'; 


/** promiseObject being the data returned by getQuery
 * x.then((promiseObject) => 
 * {
 * console.log(promiseObject.streets[0].key); // outputs 882 with input Corydon
 * })
 * 
 */

const getQuery = async(searchTerm, localSearchType) => {
  let tempSearch = searchTerm;
  let searchAppend = '';
  let streetAppend = '';
  if(localSearchType === searchType.schedule) {
    searchAppend = '/schedule';
  }
  if(localSearchType === searchType.streetStops) {
    streetAppend = `street=${searchTerm}`;
    tempSearch = '';
}
  const response = await fetch(`${defaultURL}${localSearchType}${tempSearch}${searchAppend}.json?${streetAppend}&api-key=${APIKey}${parameters}`);
  const data = await response.json();
  if(response.status !== 200) {
    throw new Error(`Status ${response.status}`);
  }
  return data;
}

// I plan to use Promise.allSettled() instead of Promise.all() so that even if I go over my api limit, some of the results will print out. or maybe it will just break halfway ¯\_(ツ)_/¯

const renderSidebar = function(data){ // data format is array of these objects { key: *, name: *, type?: *, leg?: *} all I need is the name & key
  clearSidebar();
  console.dir(data);
  if(data.length === 0){
    streetsList.insertAdjacentHTML('afterbegin', '<span>Sorry, no results<span>');
    return;
  }
  for(let item of data){
    addResultToSidebar(item);
  }
}

const clearSidebar = function(){
  let child = streetsList.firstElementChild;
  while(child){
    streetsList.removeChild(child);
    child = streetsList.firstElementChild;
  }
}

const addResultToSidebar = function(dataEntry){
  streetID = dataEntry.key;
  street = dataEntry.name;

  streetsList.insertAdjacentHTML('afterbegin', `<a href="#" data-street-key="${streetID}">${street}</a>`);
}

const renderContent = function(){

}

// I am aware keydown and submit are not the same 
document.querySelector("input").addEventListener("keydown", function(e){
  if(e.code === 'Enter' || e.code === 'NumpadEnter'){
    e.preventDefault();
    data = getQuery(e.target.value, searchType.street);
    data.then((data) => {
      renderSidebar(data.streets);
      console.log(data);
    })
  }
});

document.querySelector('section.streets').addEventListener('click', function(e){
  let streetKey = e.target.getAttribute('data-street-key');
  if(streetKey !== null){
  data = getQuery(streetKey, searchType.streetStops);
  data.then((data) => { // a list of stops contained in an object (called with data.stops[])
    // from here we have to, for each stop, get the next few incoming buses and output them 
    console.log(data);
  }
  )}
});