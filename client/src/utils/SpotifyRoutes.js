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

	createPlaylist: (access_token, userID, data) => {
  		const config = { headers: { 'Authorization': 'Bearer ' + access_token } };
  		return axios.post(`https://api.spotify.com/v1/users/${userID}/playlists`, data, config);
	},

	addTracksToPlaylist: (access_token, userID, playlistID, data) => {
	  const config = { headers: { 'Authorization': 'Bearer ' + access_token } };
	  return axios.post(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, data, config);
	},

	getUserPlaylists: (access_token, userID) => {
   		const config = { headers: { 'Authorization': 'Bearer ' + access_token } };
     	return axios.get(`https://api.spotify.com/v1/users/${userID}/playlists?limit=50`, config);
  	},

  	getPlaylistTracks: (access_token, userID, playlistID) => {
   		const config = { headers: { 'Authorization': 'Bearer ' + access_token } };
     	return axios.get(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, config);
   	}

}


