import React from "react";
import './authors.css';

// Material UI components
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';


const paperStyle = {
	width: '90%',
	marginTop: 50,
	display: 'inline-block'
}

const Authors = props => {
	return (
		  <div className='authorDiv'>
		  	<h1 className='headlineStyle'>Meet the Authors</h1>
		    <Paper 
		    	style={paperStyle} 
		    	zDepth={2}
		    >
		    	<div className="author">
					<figure class="authorImage">
						<img src="https://avatars0.githubusercontent.com/u/16005928?s=400&v=4" alt="Photo of Victoria"/>
					</figure>
		    		<p><h3>Victoria Palacios</h3></p>
		    		<p>Github: <a href="https://github.com/victoriapalacios">@victoriapalacios</a></p>
		    	</div>
		    </Paper>
		    <Paper 
		    	style={paperStyle} 
		    	zDepth={2}
		    >
		    	<div className="author">
		    		<figure class="authorImage">
		    			<img className="authorImage" src="https://avatars1.githubusercontent.com/u/9326234?s=460&v=4" alt="Photo of Juliette"/>
		    		</figure>
		    		<p><h3>Juliette Rapala</h3></p>
		    		<p>Github: <a href="https://github.com/jrapala">@jrapala</a></p>
		    		<p>Portfolio: <a href="http://www.julietterapala.com">julietterapala.com</a></p>
		    	</div>
		    </Paper>
		    <Paper 
		    	style={paperStyle} 
		    	zDepth={2}
		    >
		    	<div className="author">
		    		<figure class="authorImage">
		    			<img className="authorImage" src="https://avatars3.githubusercontent.com/u/26716658?s=460&v=4"/>
		    		</figure>
		    		<p><h3>Mark Walker</h3></p>
		    		<p>Github: <a href="https://github.com/markwalkernz">@markwalkernz</a></p>
		    	</div>
		    </Paper>
		  <div style={{textAlign: 'center'}}>
			<IconButton
			    style={{marginTop: 14, color: '#5A66E3', width: 120, height: 120, padding: 10, align: 'center'}}
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

