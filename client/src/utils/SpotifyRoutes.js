import axios from 'axios';

export default {

	getUserInfo: (access_token) => {
  		const config = { headers: { 'Authorization': 'Bearer ' + access_token } };
  		return axios.get('https://api.spotify.com/v1/me', config);
	},

	searchSpotifyForTrack: (access_token, query) => {
  		const config = { headers: { 'Authorization': 'Bearer ' + access_token } };
  		return axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`, config);
	},

	searchSpotifyForArtist: (access_token, query) => {
  		const config = { headers: { 'Authorization': 'Bearer ' + access_token } };
  		return axios.get(`https://api.spotify.com/v1/search?q=${query}&type=artist&limit=10`, config);
	},

	searchSpotifyForAlbum: (access_token, query) => {
  		const config = { headers: { 'Authorization': 'Bearer ' + access_token } };
  		return axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`, config);
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


