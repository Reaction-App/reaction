import React from "react";
import './homePageFooter.css';

// Material UI components
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

const HomePageFooter = props => (
  <footer style={{ margin: '0 auto', display: 'block', textAlign: 'right', color: '#454448'}}>
    <IconButton
      style={{marginTop: 14, color: '#5A66E3'}}
      tooltip='Meet the Team!'
      tooltipPosition = 'top-left'
      onClick={() => props.handlePageChange('Authors')}
    >
      <FontIcon
        style={{fontSize: '200px'}}
        color="#454448"
        hoverColor="#5A66E3"
        className="material-icons info">
          info_outline
      </FontIcon>
    </IconButton>
  </footer>
);


export default HomePageFooter;