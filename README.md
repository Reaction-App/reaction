# Reaction Music App 🎵🙂😢😡😌🎵

Create Spotify playlists that can be sorted by mood.

## Description

[Spotify’s API](https://developer.spotify.com/web-api/) provides a multitude of information about their library of songs, including measures of audio features, such as song valence (or as we like to call it, "positivity") and song energy. These features can correlate with mood. A song high on the valence and energy scales is going to be happy! 

Reaction Music App allows you create a playlist of songs, see how they fall on a mood chart, and then lets you edit and sort by mood. Once you have a playlist that you are satisfied with, you can easily export it to your Spotify account.

## Getting Started

### Live Example

[https://reaction-music.herokuapp.com/](https://reaction-music.herokuapp.com/)

> Since the app is hosted on a free [Heroku](https://www.heroku.com/) instance, it may need some time to boot up.

### Installing

After downloading the distribution, you will need to download the app dependencies:

```
$ cd reaction
$ yarn install
$ cd client
$ yarn install
```

Then, navigate to the root directory and run the application:

```
$ cd reaction
$ yarn start
```

## Using Reaction Radio


## Deployment
You can easily deploy this application to a platform such as Heroku.

1. Register an application on [Spotify Developer](https://developer.spotify.com/). Once registered, you must add the following Redirect URIs to your application (found in the application settings in [My Apps](https://beta.developer.spotify.com/dashboard/applications)).

	Local Direct:
	> localhost:3000/home
	
	Your Remote Redirect:
	> [YOUR APP URL]/home

2. When you are ready to deploy, navigate to ```reaction/client/src/pages/LoginPage/LoginPage.js```. 

	Comment out the local ```REDIRECT_URL``` and use the Heroku ```REDIRECT_URI``` instead. Replace the remote URI with the URI of your application. (It must end in ```/home```).
  
	```
	IF USING LOCALHOST, USE THIS URL
	const REDIRECT_URI = encodeURIComponent('http://localhost:3000/home');
	
	// IF USING HEORKU, USE THIS URL
	// const REDIRECT_URI = encodeURIComponent('https://reaction-music.herokuapp.com/home/');
	```
3. Run ```yarn build``` and deploy!

## Built With

* [React](https://reactjs.org/) - JavaScript library for building user interfaces
* [Material UI](http://www.material-ui.com/) - Google's material design UI components built with React.
* [Highcharts](https://www.highcharts.com/) - JavaScript charting library
* [Node.js](https://nodejs.org/) - A JavaScript run-time environment
* [Express](https://expressjs.com/) - A Node.js web application framework
* [MongoDB](https://www.mongodb.com/) - A NoSQL database program
* [Spotify Web API](https://developer.spotify.com/web-api/) - Spotify Web API for retrieving song data
* [React Flip Move](https://github.com/joshwcomeau/react-flip-move) - Animation for React list components 

## Authors

* **Victoria Palacios** - [https://github.com/victoriapalacios](https://github.com/victoriapalacios)
* **Juliette Rapala** - [https://github.com/jrapala](https://github.com/jrapala)
* **Mark Walker** - [https://github.com/markwalkernz](https://github.com/markwalkernz)

## Acknowledgments

* This app was inspired by Charlie Thompson's app [Sentify](http://www.rcharlie.net/sentify)


