import React from 'react';
import HomepageImage from '../HomepageImage'
import '../../App.scss'

const Home = () => {
	return (
		<>
			<div className='mainDiv'>
				<HomepageImage className='homeImg' />
				<p className='title'>
					About
				</p>
			</div>
		</>
	);
}

export default Home;