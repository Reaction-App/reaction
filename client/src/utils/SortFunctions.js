const sortFunction = {

	// function for dynamic sorting
  	// compares two objects, a and b
  	// if the value of a[key] is greater than the value of b[key], comparison is 1
  	// if the value of a[key] is less than the value of b[key], comparison is -1
	compareValues: (key, order='asc') => {
		return function(a, b) {
	      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
	        // property doesn't exist on either object
	          return 0;
	      }

	      // if values are strings, convert to upper case
	      const varA = (typeof a[key] === 'string') ?
	        a[key].toUpperCase() : a[key];
	      const varB = (typeof b[key] === 'string') ?
	        b[key].toUpperCase() : b[key];

	      // compare values
	      let comparison = 0;
	      if (varA > varB) {
	        comparison = 1;
	      } else if (varA < varB) {
	        comparison = -1;
	      }

	      // if sorting in descending order, multiply comparison by -1 to get the inverse
	      return (
	        (order === 'desc') ? (comparison * -1) : comparison
	      );
	    };
	},

	// Function used to sort by mood or by a selected track
  	calcDistance: (tracks, targetValence, targetEnergy) => {

	    let newTracks = tracks.slice();

	    if (targetValence >= 0 && targetEnergy >= 0) {
	      newTracks.forEach((track, index) => {
	        if (track.valence && track.energy) {
	          track.distance = Math.pow((targetValence - track.valence),2) + Math.pow((targetEnergy - track.energy),2);
	        };
	      });
	    };

	    return(newTracks);
	}
};

module.exports = sortFunction;