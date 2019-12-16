import React, { Component } from 'react';
import '../../App.scss';
import './GetStarted.scss';
import FormStep1 from '../FormStep1';
import FormStep2 from '../FormStep2';
import { Button } from 'reactstrap'
import { Col, Row } from 'reactstrap';
import HomepageImage from '../HomepageImage'

class GetStarted extends Component {
	constructor(props) {
		super(props);
		this.state = {
			year: null,
			month: null,
			day: null,
			currentStep: 1
		};
    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	// Use the submitted data to set the state
	handleChange(event) {
		const {name, value} = event.target
		this.setState({
			[name]: value
		})    
	}

	_next() {
    let currentStep = this.state.currentStep
    // If the current step is 1 or 2, then add one on "next" button click
    currentStep = currentStep >= 2? 3: currentStep + 1
    this.setState({
      currentStep: currentStep
    })
	}
	
	_prev() {
    let currentStep = this.state.currentStep
    // If the current step is 2 or 3, then subtract one on "previous" button click
    currentStep = currentStep <= 1? 1: currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }

	// The "next" and "previous" button functions
	get previousButton(){
		let currentStep = this.state.currentStep;
		// If the current step is not 1, then render the "previous" button
		if(currentStep !==1){
			return (
				<Button 
					type="button"
					color='secondary'
					onClick={this._prev}
				>
				Previous
				</Button>
			)
		}
		// ...else return nothing
		return null;
	}

	get nextButton(){
		let currentStep = this.state.currentStep;
		// If the current step is not 3, then render the "next" button
		if(currentStep <3){
			return (
				<Button 
					className="float-right" 
					type="button" onClick={this._next}>
				Next
				</Button>        
			)
		}
		// ...else render nothing
		return null;
	}

	render() {
		return (
			<>
				<div className='mainDiv'>
				<HomepageImage className='homeImg' />
				<h5 className='formHeading'> Before you can get started planning your dream park trip we'll need some info from you!</h5>
				</div>
				<Row>
					<Col>
						<FormStep1 
							currentStep={this.state.currentStep} 
							handleChange={this.handleChange}
						/>
						<FormStep2
							currentStep={this.state.currentStep} 
							handleChange={this.handleChange}
						/>
					</Col>
				</Row>
				<div className='next-btn'>
					<Row>
						<Col md={9}>
							{this.nextButton}
							{this.previousButton}
						</Col>
					</Row>
				</div>
			</>
		);
	}
}

export default GetStarted;