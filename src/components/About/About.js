import React, {Component} from 'react';
import HomepageImage from '../HomepageImage'
import '../../App.scss'
import './About.scss'

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
				</div>
				<div className='infoMain'>
					<h1 className='info'>About</h1>
					<p className='info'>
						ParkPlan is a web application to help you streamline the
						planning required before your theme park visits. It gives 
						intelligent ride suggestions, calculated from your
						demographic data with machine learning (decision trees) 
						technologies. As well as this you will be able to filter 
						reviews for the park you wish to visit, reducing the time 
						required trawling through them on the web. This info along
						with helpful details - park opening time, crowd levels and 
						predicted queue times your visit date are all converted to 
						a downloadable PDF for viewing and printing however you wish!
					</p>
					<h5 className='info'>Happy planning!</h5>
					<h3 className='info'>Acknowledgements</h3>
					<p className='info'>
						Many thanks to Zachary Bull creator of https://queue-times.com/
						for kindly providing some of the data to support this project. 
					</p>
				</div>
			</>
		);
	}
}

export default About;