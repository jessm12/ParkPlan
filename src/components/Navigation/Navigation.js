import React from 'react';
import './Navigation.scss';
import { Button } from 'reactstrap'
import { NavLink } from 'react-router-dom';

// rendering of the navigation bar
const Navigation = () => {
	return (
		<div className='navBar'>
			<NavLink to="/">
				<Button className='navButton' color='secondary'>
					Home
        </Button>
			</NavLink>
			<NavLink to="/Plan">
				<Button className='navButton' color='secondary'>
					Plan
        </Button>
			</NavLink>
			<NavLink to="/TheParks">
				<Button className='navButton' color='secondary'>
					The Parks
        </Button>
			</NavLink>
			<NavLink to="/About">
				<Button className='navButton' color='secondary'>
					About
        </Button>
			</NavLink>
		</div>
	);
}

export default Navigation;