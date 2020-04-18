import React, {Component} from 'react';
import '../../App.scss'

class Rides extends Component {
	constructor(props) {
		super(props);
		this.state = {
			features: null
		};
	}

	getGuestPreferences(preferences) {
		const preferenceByType = {'thrill rides': 0, 'water rides': 0, 
		'big drops': 0,	'small drops': 0, 'dark': 0, 'loud': 0,
		'scary': 0,	'interactive': 0, 'spinning': 0, 'stage show': 0}
	
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
				preferenceByType[tag]++;
			}
		}
	}

	render() {
		return (
			<>
			</>
		);
	}
}

export default Rides;