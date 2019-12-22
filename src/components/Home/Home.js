import React , { Component } from 'react';
import HomepageImage from '../HomepageImage'
import { Button } from 'reactstrap';
import '../../App.scss';
import './Home.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const initialState = {
	waitTimes: false,
	familyFriendly: false,
	foodChoices: false,
	visitorReviews: false,
	parkNavigation: false,
	string: '',
	tokenise: ''
};

class Home extends Component {
	constructor(props) {
    super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = initialState
	}

	handleChange(event) {
    this.setState({ string: event.target.value });
	}

  handleSubmit(event) {
    event.preventDefault();
    fetch(`/api/tokenise?name=${encodeURIComponent(this.state.string)}`)
      .then(response => response.json())
			.then(state => this.setState(state));    
  }
	
	handleReset() {
		this.setState(initialState);
	}

	handleClick(event) {
		this.handleReset();
		var id = event.target.getAttribute('id');
		this.setState({
			[id]: true
		})  
	}
	
	render() {
		fetch(`/api/read`);
		return (
			<>
				<div className='mainDiv'>
					<HomepageImage className='homeImg' />
					<div className='infoBtns'>
						<Button
							id='waitTimes'
							className='infoBtn'
							onClick={this.handleClick}
						>
							Wait times <FontAwesomeIcon icon="clock" />
						</Button>
						<Button 
							id='familyFriendly'
							className='infoBtn'
							onClick={this.handleClick}
						>
							Family friendly <FontAwesomeIcon icon="child" />
						</Button>
						<Button 
							id='foodChoices'
							className='infoBtn'
							onClick={this.handleClick}
						>
							Food choices <FontAwesomeIcon icon="hamburger" />
						</Button>
						<Button 
							id='visitorReviews'
							className='infoBtn'
							onClick={this.handleClick}
						>
							Visitor reviews <FontAwesomeIcon icon="user-check" />
						</Button>
						<Button 
							id='parkNavigation'
							className='infoBtn'
							onClick={this.handleClick}
						>								
							Park navigation <FontAwesomeIcon icon="map-signs" />
						</Button>
						{ this.state.waitTimes &&
							<div className='info'>Wait times</div>
						}
					  { this.state.familyFriendly &&
							<div className='info'>Family friendly</div>
						}
						{ this.state.foodChoices &&
							<div className='info'>Food choices</div>
						}
						{ this.state.visitorReviews &&
							<div className='info'>Visitor reviews</div>
						}
						{ this.state.parkNavigation &&
							<div className='info'>Park navigation</div>
						}
					</div>
					<form onSubmit={this.handleSubmit}>
            <label htmlFor="string">Enter string to tokenise: </label>
            <input
              id="name"
              type="text"
              value={this.state.string}
              onChange={this.handleChange}
            />
            <button type="submit">Submit</button>
          </form>
          <p>{this.state.tokenise}</p>
				</div>
			</>
		);
	}
}

export default Home;