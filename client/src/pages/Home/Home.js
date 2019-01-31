import React from "react";
import SearchBar from "../../components/SearchBar";
import SearchResults from "../../components/SearchResults";
import HomePageFooter from "../../components/HomePageFooter";
import './home.css';

const Home = props => {

  return (

    <div>

      <div style={{
        backgroundImage: 'url(https://s10.postimg.cc/hvq64sq1l/search-background.jpg)',
        width: "100%",
        backgroundSize: 'cover',
        marginBottom: 50,
        paddingTop: 80
      }}>
        <h3 style={{
          marginTop: 0,
          paddingTop: 20,
          color: 'white',
          textAlign: 'center'
        }}>
          Hey there, {props.userData.userName ? props.userData.userName : props.userData.userID}
        </h3>
        <div style={{margin: '0 auto', display: 'block', textAlign: 'center'}}>
          <SearchBar {...props}/>
        </div>
      </div>

      <div
        className="tableDiv"
        style={{
          marginBottom: 100
      }}>
        {props.tracks.length ? (
          <SearchResults {...props}/>
        ) : ( 
          <div style={{ margin: '0 auto', marginTop: 80, display: 'block', textAlign: 'center', maxWidth: 650, color: '#454448' }}>
            <img style={{ width: 150 }} src='https://s17.postimg.cc/vobidfu3z/start-searaching.png' alt="Start Searching" />
            {props.noSongFound ? (
              <h2 style={{ fontFamily: 'Montserrat' }}>Sorry, no results found! Please try another search.</h2>
            ):
            ( <h2 className="empty-state-text" style={{ fontFamily: 'Montserrat' }}>Start by searching for a song, artist or album. Then click “Add Song” to begin curating your playlist.</h2>
            )}
          </div>
        )}
      </div>

      <HomePageFooter {...props}/>

    </div>
  )}

export default Home;

