import React from "react";
import './authors.css';

// Material UI components
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';


const paperStyle = {
	width: '25%',
	// height: '800px',
	margin: 10,
	marginTop: 20,
	display: 'inline-block'
}

const Authors = props => {
	return (
		  <div className='authorDiv'>
		  	<h1 className='headlineStyle'>Meet the Team</h1>
		    <Paper 
		    	style={paperStyle} 
		    	zDepth={2}
		    >
				<img className="authorImage" src="https://avatars0.githubusercontent.com/u/16005928?s=400&v=4" alt="Victoria Palacios"/>
		    	<div className="authorInfo">
		    		<h3><b>Victoria Palacios</b></h3>
		    		<hr className="rule"></hr>
		    		<p className="GitHub"><i className="myIcon devicon-github-plain colored"></i><a target="_blank" rel="noopener noreferrer" href="https://github.com/victoriapalacios">@victoriapalacios</a></p>
		    		<p className="mobileOnly"><a target="_blank" rel="noopener noreferrer" href="https://github.com/victoriapalacios"><i className="myIcon devicon-github-plain colored"></i></a></p>
		            <p className="email"><FontIcon className="material-icons myIcon">mail_outline</FontIcon>victoriapalacios6171<span>@gmail.com</span></p>
		    		<p className="mobileOnly"><a href="mailto:victoriapalacios6171@gmail.com"><FontIcon className="material-icons myIcon">mail_outline</FontIcon></a></p>

		    	</div>
		    </Paper>
		    <Paper 
		    	style={paperStyle} 
		    	zDepth={2}
		    >
		    	<img className="authorImage" src="https://avatars1.githubusercontent.com/u/9326234?s=460&v=4" alt="Juliette Rapala"/>
				<div className="authorInfo">
		    		<h3><b>Juliette Rapala</b></h3>
		    		<hr className="rule"></hr>
		    		<p className="GitHub"><i className="myIcon devicon-github-plain colored"></i><a target="_blank" rel="noopener noreferrer" href="https://github.com/jrapala">@jrapala</a></p>
		            <p className="mobileOnly"><a target="_blank" rel="noopener noreferrer" href="https://github.com/jrapala"><i className="myIcon devicon-github-plain colored"></i></a></p>
		            <p className="email"><FontIcon className="material-icons myIcon">mail_outline</FontIcon>jrapala<span>@gmail.com</span></p>
		    		<p className="mobileOnly"><a href="mailto:jrapala@gmail.com"><FontIcon className="material-icons myIcon">mail_outline</FontIcon></a></p>
		            {/*<p><FontIcon className="material-icons myIcon">computer</FontIcon><a href="http://www.julietterapala.com">www.julietterapala.com</a></p>*/}
		    	</div>
		    </Paper>
		    <Paper 
		    	style={paperStyle} 
		    	zDepth={2}
		    >
		    	<img className="authorImage" src="https://avatars3.githubusercontent.com/u/26716658?s=460&v=4" alt="Mark Walker"/>
		    	<div className="authorInfo">
		    		<h3><b>Mark Walker</b></h3>
		    		<hr className="rule"></hr>
		    		<p className="GitHub"><i className="myIcon devicon-github-plain colored"></i><a target="_blank" rel="noopener noreferrer" href="https://github.com/markwalkernz">@markwalkernz</a></p>
					<p className="mobileOnly"><a target="_blank" rel="noopener noreferrer" href="https://github.com/markwalkernz"><i className="myIcon devicon-github-plain colored"></i></a></p>		    		
		    		<p className="email"><FontIcon className="material-icons myIcon">mail_outline</FontIcon>markwalkernz<span>@gmail.com</span></p>
		    		<p className="mobileOnly"><a href="mailto:markwalkernz@gmail.com"><FontIcon className="material-icons myIcon">mail_outline</FontIcon></a></p>
		    	</div>
		    </Paper>
		  <div style={{textAlign: 'center'}}>
			<IconButton
			    style={{marginTop: 0, color: '#5A66E3', width: 120, height: 120, padding: 10, align: 'center'}}
	            tooltip='Go Back'
	            tooltipPosition = 'bottom-right'
	            onClick={() => props.handlePageChange('Home')}
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
	)
}

export default Authors;

