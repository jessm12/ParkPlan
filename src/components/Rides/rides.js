import React, {Component} from 'react';
import '../../App.scss'
import { Text } from '@react-pdf/renderer'


class Rides extends Component {
	constructor(props) {
		super(props);
		this.state = {
			features: null
		};
	}

	getGuestPreferences(preferences) {
		const preferenceByTag = {'thrill rides': 0, 'water rides': 0, 
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
			for (const tag of tags[i]) {
				if (preferences[i] == 1) {
					preferenceByTag[tag]++
				}
				tagTotals[tag]++;
			}
		}

		for (const key in tagTotals){
			preferenceByTag[key]/=tagTotals[key];
		}

		console.log(preferenceByTag);
		return preferenceByTag;
	}

	render() {
		return (
			<>
				<Text>{JSON.stringify(this.getGuestPreferences(this.props.preferences))}</Text>
			</>
		);
	}
}

export default Rides;