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
	parkNavigation: false
};

class Home extends Component {
	constructor(props) {
    super(props);
		this.handleClick = this.handleClick.bind(this);
    this.state = initialState
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
				</div>
			</>
		);
	}
}

export default Home;