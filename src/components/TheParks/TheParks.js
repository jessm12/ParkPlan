import '../../App.scss';
import HomepageImage from '../HomepageImage'
import MagicKingdom from './assets/magic-kingdom.jpg';
import HollywoodStudios from './assets/hollywood-studios.jpg';
import DisneylandParis from './assets/disneyland-paris.jpg'
import Portaventura from './assets/portaventura.jpg'
import Epcot from './assets/epcot.jpg'
import './TheParks.scss'
import React from 'react';
import '../../App.scss'
import { Row, Col } from 'reactstrap';
import { UncontrolledCarousel } from 'reactstrap';

const items = [
  {
		src: MagicKingdom,
    header: 'Magic Kingdom Park - Florida, USA',
    caption: 'Magic Kingdom park is a theme park at Walt Disney World Resort featuring classic attractions, enchanting fireworks, musical parades and Disney Characters.'
  },
  {
		src: HollywoodStudios,
    header: 'Disney\'s Hollywood Studios - Florida, USA',
    caption: 'Disney\'s Hollywood Studios is a theme park at Walt Disney World Resort with iconic attractions, blockbuster entertainment, character experiences and more.'
  },
  {
		src: DisneylandParis,
    header: 'Disneyland Paris - France',
    caption: 'From thrill rides to family adventures there\'s plenty to explore at Disneyland Paris. The Parks are packed with Disney attractions and unforgettable experiences.'
  },
  {
		src: Portaventura,
    header: 'PortAventura Park - Spain',
    caption: 'Discover the six worlds of one of Europe\'s most iconic theme parks. An ideal destination for a family getaway in the Costa Dorada, one of Spain\'s most popular tourist areas; and just one hour from Barcelona!'
  },
  {
		src: Epcot,
    header: 'Epcot - Florida, USA',
    caption: 'Explore exciting attractions, enchanting international pavilions, award-winning fireworks and seasonal special events.'
  }
];

const TheParks = () => {
  return (
		<div className='mainDiv'>
			<HomepageImage className='homeImg' />
			<Row>
				<Col md="1" sm="1" lg="2">
				</Col>
				<Col md="10" sm="10" lg="8">
					<div className='carouselDiv'>
						<UncontrolledCarousel items={items}/>
					</div>
				</Col>
				<Col md="1" sm ="1" lg="2">
				</Col>
			</Row>
		</div>
  );
}

export default TheParks;