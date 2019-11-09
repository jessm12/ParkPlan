import React from 'react';
import '../../App.scss';
import HomepageImage from '../HomepageImage'

const GetStarted = () => {
	return (
		<>
			<div className='mainDiv'>
				<HomepageImage className='homeImg' />
				<p className='title'>
					Get started
				</p>
			</div>
		</>
	);
}

export default GetStarted;