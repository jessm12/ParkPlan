import React, {Component} from 'react';
import '../../App.scss'
import { Text } from '@react-pdf/renderer'
import axios from 'axios';

const API_PATH = 'http://cojlm.sci-project.lboro.ac.uk/api/parkrides/index.php';

class Rides extends Component {
	constructor(props) {
		super(props);
		this.state = {
			features: null,
			rides: null,
		};

		this.getGuestRidesFromPreferences = this.getGuestRidesFromPreferences.bind(this);
		this.getParkRides = this.getParkRides.bind(this);
	}

	getParkRides(parkID) {
		return axios({
			method: 'post',
			url: `${API_PATH}`,
			headers: { 'content-type': 'application/json' },
			data: parkID,
		})
	}

	async getGuestRidesFromPreferences(preferences, parkID) {
		let rides = (await this.getParkRides(parkID)).data;

		let preferenceByTag = {'thrill rides': 0, 'water rides': 0, 
		'big drops': 0,	'small drops': 0, 'dark': 0, 'loud': 0,
		'scary': 0,	'interactive': 0, 'spinning': 0, 'stage show': 0,
		'slow rides': 0}

		const tagTotals = {'thrill rides': 0, 'water rides': 0, 
		'big drops': 0,	'small drops': 0, 'dark': 0, 'loud': 0,
		'scary': 0,	'interactive': 0, 'spinning': 0, 'stage show': 0,
		'slow rides': 0}
	
		const tags = [
			['thrill rides', 'small drops', 'dark'],
			['thrill rides', 'water rides', 'big drops'],
			['thrill rides', 'spinning', 'dark'],
			['thrill rides', 'small drops'],
			['thrill rides', 'big drops', 'loud'],
			['slow rides', 'spinning'],
			['thrill rides', 'water rides', 'small drops'],
			['thrill rides', 'big drops', 'dark', 'scary'],
			['thrill rides', 'small drops', 'dark', 'scary'],
			['stage show'],
			['spinning', 'interactive']
		]

		for (let i = 0; i < preferences.length; i++) {
			for (const tag1 of tags[i]) {
				if (preferences[i] == 1) {
					preferenceByTag[tag1]++
				}
				tagTotals[tag1]++;
			}
		}

		for (const tag2 in tagTotals){
			preferenceByTag[tag2]/=tagTotals[tag2];
		}

		for (let ride of rides){
			const rideTags = ride.tags.split(',');
			let probability = 1;
			for (const tag3 of rideTags){
				let tagPref = preferenceByTag[tag3];
				probability = probability * tagPref;
			}
			ride.probability = probability;
		}

		rides.sort((a, b) => (a.probability < b.probability) ? 1 : -1)

		rides = rides.slice(0,6);

		return rides;
	}

	componentDidMount(){
		this.getGuestRidesFromPreferences(this.props.preferences, this.props.parkID)
		.then(rides => this.setState({rides}))
	}

	render() {
		return (
			<>
				{this.state.rides && (
					<p>{JSON.stringify(this.state.rides)}</p>
				)}
			</>
		);
	}
}

export default Rides;