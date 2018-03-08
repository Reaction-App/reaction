import React, { Component } from 'react';
import Author from "../../components/Author";
import './authors.css';

// Material UI components
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';


class Authors extends Component {
	state = {
		authorInfo: [
			{
				authorName: "Victoria Palacios",
				authorImage: "https://avatars0.githubusercontent.com/u/16005928?s=400&v=4",
				authorGitHubURL: "https://github.com/victoriapalacios",
				authorGitHubUserName: "@victoriapalacios",
				authorLinkedInURL: "https://www.linkedin.com/in/victoriapalacios/",
				authorLinkedInUserName: "@victoriapalacios",
				authorEmail: "victoriapalacios6171@gmail.com",
			},
			{
				authorName: "Juliette Rapala",
				authorImage: "https://avatars1.githubusercontent.com/u/9326234?s=460&v=4",
				authorGitHubURL: "https://github.com/jrapala",
				authorGitHubUserName: "@jrapala",
				authorLinkedInURL: "https://www.linkedin.com/in/julietterapala/",
				authorLinkedInUserName: "@julietterapala",
				authorEmail: "jrapala@gmail.com",
			},
			{
				authorName: "Mark Walker",
				authorImage: "https://avatars3.githubusercontent.com/u/26716658?s=460&v=4",
				authorGitHubURL: "https://github.com/markwalkernz",
				authorGitHubUserName: "@markwalkernz",
				authorLinkedInURL: "https://www.linkedin.com/in/mark-walker-5b25107/",
				authorLinkedInUserName: "@mark-walker-5b25107",
				authorEmail: "markwalkernz@gmail.com",
			},
		]
	}

	render() {

		return (

		  <div className='authorDiv'>
		  	<h1 className='headlineStyle'>Meet the Team</h1>
		    <div className='authors'>
			    {this.state.authorInfo.map((author, index) => {
			   		return (<Author key={author.authorName} author={author}/>)
			   	})}
		    </div>	
			<div className='infoDiv'>
		  		<div>
		    		<Paper 
		    			zDepth={2}
		    			className="infoPaper"
		    		>
		    			<p>Check out the code behind this project at <a target="_blank" rel="noopener noreferrer" href="https://github.com/Reaction-App/reaction">GitHub</a></p>
		  			</Paper>
		    	</div>
		    </div>
		  <div style={{textAlign: 'center'}}>
			<IconButton
			    style={{marginTop: 0, color: '#5A66E3', width: 120, height: 120, padding: 10, align: 'center'}}
	            tooltip='Go Back'
	            tooltipPosition = 'bottom-right'
	            onClick={() => this.props.handlePageChange('Home')}
	            iconStyle={{fontSize: 60}}
			>
	            <FontIcon 
	              hoverColor="#454448"
	              color="#5A66E3"
	              className="material-icons"
	            >
	                fast_rewind
	            </FontIcon>
			</IconButton>
		  </div>
		  </div>
	)}
}

export default Authors;

