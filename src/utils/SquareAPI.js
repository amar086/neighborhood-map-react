class Helper {

	static baseUrl() {
		return "https://api.foursquare.com/v2";
	} 

	static urlBuilder(urlParams){
		if(!urlParams)
			return "" 
		return Object.keys(urlParams).map(key => `${key}=${urlParams[key]}`).join("&");
	}

	static auth(){
		const keys = {
			client_id: "EQNOLG11AZT4GAN4WAVETSXZJQXZQXK32FUGUWTUZJAUNPEE", 
			client_secret:"YDIDEXUX5KJBTNOZ50TKMJU5ETLLNRQR21ZFCGVXI4VMVQL1", 
			v: "20130815"
		}
		return Helper.urlBuilder(keys);
	} 

	static headers() {
		return {"Accept": "application/json"}
	}


	static simpleFetch(endpoint, method, urlParams){
		let requestData = {
			method, 
			headers: Helper.headers()
		}
		return fetch(`${Helper.baseUrl()}${endpoint}?${Helper.auth()}&${Helper.urlBuilder(urlParams)}`, requestData)
		.then(res => res.json());
	}

}

export default class SquareAPI {
	static search(urlParams) {
		return Helper.simpleFetch("/venues/search", "GET", urlParams);
	}

	static getVenueDetails(VENUE_ID){
		return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET");
	} 

	static getVenuePhotos(VENUE_ID){
		return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET");		
	}
}

