import React from 'react';
import './HomepageImage.scss';
import logo from './images/Disney.jpg';

function HomepageImage() {
	return (
		<div className='imageDiv'>
			<img className='image' alt='home' src={logo}>
			</img>
			<div className="siteTitle">ParkPlan</div>
			<div className="siteSubtitle">
				Plan your park visits so you never
				miss a moment of fun. Powered by AI
				technologies.
			</div>
		</div>
	);
}

export default HomepageImage;