import React from 'react';
import '../../App.scss';
import HomepageImage from '../HomepageImage'

const TheParks = () => {
	return (
		<>
			<div className='mainDiv'>
				<HomepageImage className='homeImg' />
				<p className='title'>
					The Parks
				</p>
			</div>
		</>
	);
}

export default TheParks;