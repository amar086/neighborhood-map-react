import idb from 'idb';


export const dbPromise = idb.open('restaurants-app-db', 1, upgradeDB => {
  upgradeDB.createObjectStore('ajax_fetches');
  var venues_store = upgradeDB.createObjectStore('venues', { keyPath: 'id' });
  venues_store.createIndex('id', 'id');
});

export function getPlaces() {
  return dbPromise.then(db => {
    return db.transaction('venues').objectStore('venues').getAll();
  })
}


export function storePlaces(venues) {
  if(!venues || !Array.isArray(venues)) {
    console.log(venues);
    return Promise.reject('"venues" argument must be an array');
  }
  if(venues.length === 0) {
    console.log(venues);
    return Promise.reject('"venues" array length must be greater than 1');
  }
  for(let v of venues) {
    if(v.constructor !== Object) {
      console.log(v);
      return Promise.reject('each item in "venues" must be an object literal');
    }
    if(!v.id) {
      console.log(v);
      return Promise.reject('each item in "venues" must have "id" property');
    }
  }
  return dbPromise.then(db => {
    const tx = db.transaction('venues', 'readwrite');
    let store = tx.objectStore('venues');
    venues.forEach(venue => { store.put(venue) });
    return tx.complete;
  });
}


export function generate_places() {
  return new Promise(function(resolve, reject){
    getPlaces()
    .then(venues => {
      if(venues.length > 0) {
        console.log('returning venues from idb');
        return resolve(venues) ;
      }
      console.log('fetching venues...');
      let city = 'Frederick, MD';
      let query = 'Shopping';
      var apiURL = 'https://api.foursquare.com/v2/venues/search?client_id=EQNOLG11AZT4GAN4WAVETSXZJQXZQXK32FUGUWTUZJAUNPEE&client_secret=BHBT1ESH0YEZJCZGJMLA13AJRTGLSFTHNYE1SL40VLB0Z3LO&v=20130815%20&limit=50&near=' + city + '&query=' + query + '';
      fetch(apiURL)
      .then(resp => resp.json())
      .then(json => {
        let { venues } = json.response;
        console.log('storing venues...');
        storePlaces(venues)
        .then(res => {
          console.log('stored venues');
          return resolve(venues);
        })
      })
      .catch(error => {
        reject(error);
      })
    })
    .catch(error => {
      reject(error);
    })
  });
}