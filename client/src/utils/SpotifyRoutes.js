import axios from 'axios';

export default {

	getUserInfo: (access_token) => {
		const config = { headers: { 'Authorization': 'Bearer ' + access_token } };
  		return axios.get('https://api.spotify.com/v1/me', config)
  			.catch(function (error) {
	    		if (error.response) {
			        switch (error.response.status) {
			          case 500: console.error('Some server error'); break;
			          case 400: console.error('Missing token'); document.location.href="/"; break;
			          case 401: console.error('Unauthorized'); document.location.href="/"; break;
			          default: break;
			        }
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
			        switch (error.response.status) {
			          case 500: console.error('Some server error'); break;
			          case 400: console.error('Missing token'); document.location.href="/"; break;
			          case 401: console.error('Unauthorized'); document.location.href="/"; break;
			          default: break;
			        }
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
			        switch (error.response.status) {
			          case 500: console.error('Some server error'); break;
			          case 400: console.error('Missing token'); document.location.href="/"; break;
			          case 401: console.error('Unauthorized'); document.location.href="/"; break;
			          default: break;
			        }
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
			        switch (error.response.status) {
			          case 500: console.error('Some server error'); break;
			          case 400: console.error('Missing token'); document.location.href="/"; break;
			          case 401: console.error('Unauthorized'); document.location.href="/"; break;
			          default: break;
			        }
		    	} else {
	      			// Something happened in setting up the request that triggered an Error
	      			console.log('Error', error.message);
	    		}
	    		console.log(error.config);
  			});
	}
}


