import axios from 'axios';

export default {

	getUserInfo: (access_token) => {
		const config = { 
			headers: { 'Authorization': 'Bearer ' + access_token },
			validateStatus: (status) => {
				return status < 400; // Reject only if the status code is greater than or equal to 500
			}
		};
  		return axios.get('https://api.spotify.com/v1/me', config);
	},

	searchSpotifyAPI: (access_token, query, offset) => {
  		const config = { 
  			headers: { 'Authorization': 'Bearer ' + access_token }, 
  			validateStatus: (status) => {
  				// Check for errors
		        switch (status) {
		          case 200: console.error('Missing token.'); document.location.href="/"; break;
		          case 500: console.error('Some server error'); break;
		          case 400: console.error('Missing token or blank search.'); document.location.href="/"; break;
		          case 401: console.error('Unauthorized'); document.location.href="/"; break;
		          default: break;
		        }
  			}
  		};
  		return axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=10&offset=${offset}`, config)
	},

	addTracksToPlaylist: (access_token, userID, playlistID, data) => {
		const config = { headers: { 'Authorization': 'Bearer ' + access_token } };
		return axios.post(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, data, config);
	},

	createPlaylist: (access_token, userID, data) => {
  		const config = { headers: { 'Authorization': 'Bearer ' + access_token } };
  		return axios.post(`https://api.spotify.com/v1/users/${userID}/playlists`, data, config);
	}
}


        // console.log(response);
        // switch (response.status) {
        //   case 500: console.error('Some server error'); break;
        //   case 400: console.error('Missing token'); document.location.href="/"; break;
        //   case 401: console.error('Unauthorized'); document.location.href="/"; break;
        //   default: break;
        // }