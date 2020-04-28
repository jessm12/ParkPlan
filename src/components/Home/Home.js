import React , { Component } from 'react';
import HomepageImage from '../HomepageImage'
import { Button } from 'reactstrap';
import '../../App.scss';
import './Home.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const initialState = {
	waitTimes: false,
	rideRecommendations: false,
	parkInfo: false,
	visitorReviews: false,
	data: null,
	string: '',
	tokenise: ''
};

class Home extends Component {
	constructor(props) {
    super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
			waitTimes: false,
			rideRecommendations: true,
			parkInfo: false,
			visitorReviews: false,
			data: null,
			string: '',
			tokenise: ''
		}
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
		return (
			<>
				<div className='mainDiv'>
					<HomepageImage className='homeImg' />
					<div className='infoBtns'>
						<Button 
							id='rideRecommendations'
							className='infoBtn'
							onClick={this.handleClick}
						>
							Ride Recommendations <FontAwesomeIcon icon="laugh" />
						</Button>
						<Button 
							id='visitorReviews'
							className='infoBtn'
							onClick={this.handleClick}
						>
							Visitor reviews <FontAwesomeIcon icon="user-check" />
						</Button>
						<Button 
							id='parkInfo'
							className='infoBtn'
							onClick={this.handleClick}
						>
							Park Information <FontAwesomeIcon icon="info" />
						</Button>
						<Button
							id='waitTimes'
							className='infoBtn'
							onClick={this.handleClick}
						>
							Wait times <FontAwesomeIcon icon="clock" />
						</Button>
						{ this.state.rideRecommendations &&
							<>
								<div className='info'>
									ParkPlan will recommend rides it's predicted you'll like based on the demographic information you provide. You'll be 
									given a summary of these rides to look out for when you make your theme park visit.
									
								</div>
								<div className='info'>
									Head to the plan page to get started and see what rides are suggested for you within minutes!
								</div>
							</>
						}
						{ this.state.visitorReviews &&
							<>
								<div className='info'>
									ParkPlan gives you the opportunity to filter reviews for the park you want to visit to only the categories
									you want to see. You'll get a quick summary of relevant reviews to read as opposed to having to trawl through the
									thousands available on the web.
								</div>
								<div className='info'>
									Head to the plan page to get started and read the reviews that are suggested for you within minutes!
								</div>
							</>
						}
						{ this.state.parkInfo &&
							<>
								<div className='info'>
									ParkPlan tells you what time the park should open on your selected visit date and what the
									predicted crowd levels are for that date helping you to make more informed decisions about your visit.
								</div>
								<div className='info'>
									Head to the plan page to get started planning your perfect visit!
								</div>
							</>
						}
						{ this.state.waitTimes &&
							<>
								<div className='info'>
									ParkPlan will show you predicted wait times based on historical averages when the crowd level was equal to 
									that of your visit date. This can help you to decide how long you may be willing to wait for the best rides
									and whether another visit date might give you a much better experience.
								</div>
								<div className='info'>
									Head to the plan page to get started planning your perfect visit!
								</div>
							</>
						}
					</div>
				</div>
			</>
		);
	}
}

export default Home;