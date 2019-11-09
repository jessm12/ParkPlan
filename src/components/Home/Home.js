import React from 'react';
import HomepageImage from '../HomepageImage'
import { Button, ButtonGroup } from 'reactstrap';
import '../../App.scss';
import './Home.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Home = () => {
	return (
		<>
			<div className='mainDiv'>
				<HomepageImage className='homeImg' />
				<div>
					<ButtonGroup className='infoBtns'>
						<Button className='infoBtn'>
							Wait times <FontAwesomeIcon icon="clock" />
						</Button>
						<Button className='infoBtn'>
							Family friendly <FontAwesomeIcon icon="child" />
						</Button>
						<Button className='infoBtn'>
							Food choices <FontAwesomeIcon icon="hamburger" />
						</Button>
						<Button className='infoBtn'>
							Visitor reviews <FontAwesomeIcon icon="user-check" />
						</Button>
						<Button className='infoBtn'>
							Park navigation <FontAwesomeIcon icon="map-signs" />
						</Button>
					</ButtonGroup>
				</div>
			</div>
		</>
	);
}

export default Home;