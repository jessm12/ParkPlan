import React, {Component} from 'react';
import '../../App.scss'
import axios from 'axios';
import { View, StyleSheet, Image } from '@react-pdf/renderer'
import styled from '@react-pdf/styled-components';

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

	async getGuestRidesFromPreferences(preferences, parkID, crowdLevel) {
		let data = (await this.getParkRides(parkID)).data;
		let rides = data.rides;
		let interactive = data.interactive;

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

		rides = rides.slice(0,5);

		for (let ride of rides){
			if (crowdLevel == 'very Quiet') {
				ride.wait = ride.very_quiet_wait;
			} else if (crowdLevel == 'Moderately Quiet') {
				ride.wait = ride.moderately_quiet_wait;
			} else if (crowdLevel == 'Moderately Busy') {
				ride.wait = ride.moderately_busy_wait;
			} else {
				ride.wait = ride.very_busy_wait;
			}
		}

		let attractions = [];
		attractions.push(rides);
		attractions.push(interactive);

		return attractions;
	}

	componentDidMount(){
		this.getGuestRidesFromPreferences(
			this.props.preferences,
			this.props.parkID,
			this.props.crowdLevel
		)
		.then(attractions => this.setState({
			'rides': attractions[0],
			'interactive': attractions[1]
		}))
	}

	render() {
		// Create styles
		const Heading = styled.Text`
			margin: 8px;
			margin-top: 16px;
			font-size: 18px;
			font-family: 'Helvetica';
		`;
		const Description = styled.Text`
			margin: 4px;
			font-size: 16px;
			font-family: 'Helvetica';
		`;

		const styles = StyleSheet.create({
			page: {
				flexDirection: 'row',
				backgroundColor: '#E4E4E4'
			},
			section: {
				margin: 10,
				padding: 10,
				flexGrow: 1
			}
		});

		return (
			<>
				{this.state.rides && (
					<View style={styles.section}>
						{this.state.rides.map((ride, index) => (
							<>
								<Heading>{ride.name}</Heading>
								<Description>Predicted wait time: {ride.wait} minutes</Description>
								<Description>{ride.info_text}</Description>
							</>
						))}
					</View>
				)}
			</>
		);
	}
}

export default Rides;