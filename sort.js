
const state = {tracks: [
{
	dbID: "1",
	trackName: "24K Magic",
	artist: "Bruno Mars",
	album: "24K Magic",
	trackID: "6b8Be6ljOzmkOmFslEb23P",
	trackURL: "https://api.spotify.com/v1/tracks/6b8Be6ljOzmkOmFslEb23P",
	valence: 0.632,
	energy: 0.803
},
{
	dbID: "2",
	trackName: "Never Gonna Give You Up",
	artist: "Rick Astley",
	album: "Platinum & Gold Collection",
	trackID: "0FutrWIUM5Mg3434asiwkp",
	trackURL: "https://api.spotify.com/v1/tracks/0FutrWIUM5Mg3434asiwkp",
	valence: 0.937,
	energy: 0.976
},
{
	dbID: "3",
	trackName: "Hurt",
	artist: "Johnny Cash",
	album: "Unearthed",
	trackID: "5rpRzNcJZqKQXk9PIjreB6",
	trackURL: "https://api.spotify.com/v1/tracks/5rpRzNcJZqKQXk9PIjreB6",
	valence: 0.169,
	energy: 0.376
},
{
	dbID: "4",
	trackName: "Shellshock",
	artist: "New Order",
	album: "Pretty In Pink",
	trackID: "3VcjzN7bW4TwCG8bfzExfS",
	trackURL: "https://api.spotify.com/v1/tracks/3VcjzN7bW4TwCG8bfzExfS",
	valence: 0.696,
	energy: 0.793
},
{
	dbID: "5",
	trackName: "I Predict A Riot",
	artist: "Kaiser Chiefs",
	album: "Employment",
	trackID: "6q0HeADAxsP27jDJQSKaCB",
	trackURL: "https://api.spotify.com/v1/tracks/6q0HeADAxsP27jDJQSKaCB",
	valence: 0.397,
	energy: 0.982
},
{
	dbID: "6",
	trackName: "What A Wonderful World - Single Version",
	artist: "Louis Armstrong",
	album: "What A Wonderful World",
	trackID: "29U7stRjqHU6rMiS8BfaI9",
	trackURL: "https://api.spotify.com/v1/tracks/29U7stRjqHU6rMiS8BfaI9",
	valence: 0.209,
	energy: 0.169
}]};

// function for dynamic sorting
// compares two objects, a and b
// if the value of a[key] is greater than the value of b[key], comparison is 1
// if the value of a[key] is less than the value of b[key], comparison is -1
function compareValues(key, order='asc') {
  return function(a, b) {
    if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
        return 0; 
    }

    const varA = (typeof a[key] === 'string') ? 
      a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string') ? 
      b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order == 'desc') ? (comparison * -1) : comparison
    );
  };
}

//sort tracks by valence in descending order
const newTracks = state.tracks.sort(compareValues('valence', 'desc')); 

console.log("initial state");
console.log(state);
console.log("==========================");

console.log("sort tracks by valence in descending order");
console.log(newTracks);
console.log("==========================");

