import React from 'react';
import '../../App.scss';
import HomepageImage from '../HomepageImage'
import { Card, CardImg, CardBody,
	CardTitle, CardSubtitle, Button, Row, Col } from 'reactstrap';
import MagicKingdom from './assets/magic-kingdom.jpg';
import HollywoodStudios from './assets/hollywood-studios.jpg';
import DisneylandParis from './assets/disneyland-paris.jpg'
import Portaventura from './assets/portaventura.jpg'
import Epcot from './assets/epcot.jpg'
import './TheParks.scss'

const TheParks = () => {
	return (
		<>
			<div className='mainDiv'>
				<HomepageImage className='homeImg' />
				<p className='title'>
					The Parks
				</p>
				<div className='cardsDiv'>
					<Row>
						<Col sm="4">
							<Card>
								<CardImg top src={MagicKingdom} alt="Magic Kingdom" />
								<CardBody>
									<CardTitle>Magic Kingdom Park</CardTitle>
									<CardSubtitle>Florida, USA</CardSubtitle>
									<Button>Button</Button>
								</CardBody>
							</Card>
						</Col>
						<Col sm="4">
							<Card>
								<CardImg top src={HollywoodStudios} alt="Hollywood Studios" />
								<CardBody>
									<CardTitle>Disney's Hollywood Studios</CardTitle>
									<CardSubtitle>Florida, USA</CardSubtitle>
									<Button>Button</Button>
								</CardBody>
							</Card>
						</Col>
						<Col sm="4">
							<Card>
								<CardImg top src={DisneylandParis} alt="Disneyland Paris" />
								<CardBody>
									<CardTitle>Disneyland Paris</CardTitle>
									<CardSubtitle>France</CardSubtitle>
									<Button>Button</Button>
								</CardBody>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col sm="4">
							<Card>
								<CardImg top src={Portaventura} alt="PortAventura" />
								<CardBody>
									<CardTitle>PortAventura Park</CardTitle>
									<CardSubtitle>Spain</CardSubtitle>
									<Button>Button</Button>
								</CardBody>
							</Card>
						</Col>
						<Col sm="4">
							<Card>
								<CardImg top src={Epcot} alt="Epcot" />
								<CardBody>
									<CardTitle>Epcot</CardTitle>
									<CardSubtitle>Florida, USA</CardSubtitle>
									<Button>Button</Button>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</div>
			</div>
		</>
	);
}

export default TheParks;