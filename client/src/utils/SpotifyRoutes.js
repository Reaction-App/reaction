import axios from 'axios';

export default {

	getUserInfo: (access_token) => {
  		const config = { headers: { 'Authorization': 'Bearer ' + access_token } };
  		return axios.get('https://api.spotify.com/v1/me', config)
  			.catch(function (error) {
	    		if (error.response) {
		      		// The request was made and the server responded with a status code
		      		// that falls out of the range of 2xx
		      		console.log(error.response.data);
		      		console.log(error.response.status);
		      		console.log(error.response.headers);
	    		} else if (error.request) {
		      		// The request was made but no response was received
		      		// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
		      		// http.ClientRequest in node.js
		      		console.log(error.request);
		    	} else {
	      			// Something happened in setting up the request that triggered an Error
	      			console.log('Error', error.message);
	    		}
	    		console.log(error.config);
  			});
	},

	searchSpotifyAPI: (access_token, query, offset) => {
  		const config = { headers: { 'Authorization': 'Bearer ' + access_token } };
  		return axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=10&offset=${offset}`, config)
  			.catch(function (error) {
	    		if (error.response) {
		      		// The request was made and the server responded with a status code
		      		// that falls out of the range of 2xx
		      		console.log(error.response.data);
		      		console.log(error.response.status);
		      		console.log(error.response.headers);
	    		} else if (error.request) {
		      		// The request was made but no response was received
		      		// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
		      		// http.ClientRequest in node.js
		      		console.log(error.request);
		    	} else {
	      			// Something happened in setting up the request that triggered an Error
	      			console.log('Error', error.message);
	    		}
	    		console.log(error.config);
  			});
	},

	addTracksToPlaylist: (access_token, userID, playlistID, data) => {
		const config = { headers: { 'Authorization': 'Bearer ' + access_token } };
		return axios.post(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, data, config)
  			.catch(function (error) {
	    		if (error.response) {
		      		// The request was made and the server responded with a status code
		      		// that falls out of the range of 2xx
		      		console.log(error.response.data);
		      		console.log(error.response.status);
		      		console.log(error.response.headers);
	    		} else if (error.request) {
		      		// The request was made but no response was received
		      		// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
		      		// http.ClientRequest in node.js
		      		console.log(error.request);
		    	} else {
	      			// Something happened in setting up the request that triggered an Error
	      			console.log('Error', error.message);
	    		}
	    		console.log(error.config);
  			});
	},

	createPlaylist: (access_token, userID, data) => {
  		const config = { headers: { 'Authorization': 'Bearer ' + access_token } };
  		return axios.post(`https://api.spotify.com/v1/users/${userID}/playlists`, data, config)
  			.catch(function (error) {
	    		if (error.response) {
		      		// The request was made and the server responded with a status code
		      		// that falls out of the range of 2xx
		      		console.log(error.response.data);
		      		console.log(error.response.status);
		      		console.log(error.response.headers);
	    		} else if (error.request) {
		      		// The request was made but no response was received
		      		// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
		      		// http.ClientRequest in node.js
		      		console.log(error.request);
		    	} else {
	      			// Something happened in setting up the request that triggered an Error
	      			console.log('Error', error.message);
	    		}
	    		console.log(error.config);
  			});
	},
}


