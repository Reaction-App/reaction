import React from "react";
import './author.css';

// Material UI components
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';

const Author = props => {
	return (
	    <Paper 
	    	zDepth={2}
	    	className="author"
	    >
			<img className="authorImage" src={props.author.authorImage} alt={props.author.authorName}/>
	    	<div className="authorInfo">
	    		<h3><b>{props.author.authorName}</b></h3>
	    		<hr className="rule"></hr>
	    		<p className="GitHub"><i className="myIcon devicon-github-plain colored"></i><a target="_blank" rel="noopener noreferrer" href={props.author.authorGitHubURL}>{props.author.authorGitHubUserName}</a></p>
	            <p><i className="fab fa-linkedin fa-2x myIcon"></i><a target="_blank" rel="noopener noreferrer" href={props.author.authorLinkedInURL}>{props.author.authorLinkedInUserName}</a></p>
	            <p className="email"><FontIcon className="material-icons myIcon">mail_outline</FontIcon>{props.author.authorEmail}</p>
	    	</div>
	    </Paper>		    
	)
}

export default Author;

