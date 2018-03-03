import React from "react";
import './searchBar.css';

// Material UI components
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

const SearchBar = props => (
  <form>
  
    <SelectField
      className="search-drop-down"
      value={props.searchOption}
      onChange={props.handleSearchOption}
      style = {{backgroundColor:'#FFFFFF', height: 60}}
      underlineShow={false}
    >
      <MenuItem value={"title"} primaryText="Title" />
      <MenuItem value={"artist"} primaryText="Artist" />
      <MenuItem value={"album"} primaryText="Album" />
    </SelectField>

    <TextField
      className="search-field"
      underlineShow={false}
      hintText={props.searchHintText}
      name="query"
      value={props.query}
      onChange={props.handleInputChange}
      style={{
        backgroundColor: '#FFFFFF',
        height: 60,
        fontSize: 20,
        fontFamily: 'Montserrat',
        width: '35%'
      }}
    />

    <button
      className="button-search"
      onClick={props.handleFormSubmit}>
      <span className="search-word">Search</span>
      <span className="search-icon">
        <FontIcon
          className="material-icons"
          style={{fontSize: '30px'}}
          color="#00000"
        >search
        </FontIcon>
      </span>
    </button>

  </form>  

);

export default SearchBar;
