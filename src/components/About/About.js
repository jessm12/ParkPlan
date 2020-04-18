import React, {Component} from 'react';
import HomepageImage from '../HomepageImage'
import '../../App.scss'
import {classify} from '../tree.js'

class About extends Component {
	constructor(props) {
		super(props);
		this.state = {
			features: null
		};
	}

	render() {
		return (
			<>
				<div className='mainDiv'>
					<HomepageImage className='homeImg' />
					<p className='title'>
						About
					</p>
					<h1>{classify([0,4,31,18,30,0])}</h1>
				</div>
			</>
		);
	}
}

export default About;