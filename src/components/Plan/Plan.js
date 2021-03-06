import React, { Component } from 'react';
import '../../App.scss';
import './Plan.scss';
import FormStep1 from '../FormStep1';
import FormStep2 from '../FormStep2';
import FormStep3 from '../FormStep3';
import {classify} from '../tree.js'
import { Prompt } from 'react-router-dom'
import {getPreferredRides, getPreferredReviews} from '../heuristics.js'
import { Col, Row, Button } from 'reactstrap';
import HomepageImage from '../HomepageImage'
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet  } from '@react-pdf/renderer'
import axios from 'axios';
import styled from '@react-pdf/styled-components';

// define API paths for park date info, reviews and rides
const API_PATH = 'http://cojlm.sci-project.lboro.ac.uk/api/parkdateinfo/index.php';
const API_PATH2 = 'http://cojlm.sci-project.lboro.ac.uk/api/parkreviews/index.php';
const API_PATH3 = 'http://cojlm.sci-project.lboro.ac.uk/api/parkrides/index.php';

class Plan extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: null,
			park: null,
			parkID: null,
			openTime: null,
			crowdLevel: null,
			day: null,
			month: null,
			group: null, 
			visitorCount: null,
			visitorAges: null,
			preferences: null,
			disabled1: true,
			disabled2: true,
			currentStep: 1,
			money: 0,
			family: 0,
			time: 0,
			food: 0,
			shows: 0,
			comparison: 0,
			seasonal: 0,
			accomodation: 0,
			theme: 0,
			rides: 0,
			convenience: 0,
			parkReviews: null,
			parkRides: null
		};
    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	// define callback functions for each step

	stepOneDataCallback = (park, parkID, day, month, disabled1) => {
		this.setState({
			park,
			parkID,
			day,
			month,
			disabled1
		}, () =>
		this.getDateParkInfo());
	}

	stepTwoDataCallback = (group, visitorCount, visitorAges, 
		regular, waitTimePref, disabled2) => {
		this.setState({
			group,
			visitorCount,
			visitorAges,
			regular,
			waitTimePref,
			disabled2
		})
	}

	stepThreeDataCallback = (money, family, time, food, shows, comparison,
	  seasonal, accomodation, theme, rides, convenience) => {
		this.setState({
			money,
			family,
			time,
			food,
			shows,
			comparison,
			seasonal,
			accomodation,
			theme,
			rides,
			convenience
		})
	}

	// Use the submitted data to set the state
	handleChange(event) {
		const {name, value} = event.target
		this.setState({
			[name]: value
		})    
	}

	// API calls from PHP backend
	getParkReviews(parkID) {
	  axios({
			method: 'post',
			url: `${API_PATH2}`,
			headers: { 'content-type': 'application/json' },
			data: parkID,
		})		
		.then(result => {
			this.setState({
				parkReviews: result.data.reviews
			})
		})
		.catch(error => console.log('error' + error));
	}

	getParkRides(parkID) {
		axios({
			method: 'post',
			url: `${API_PATH3}`,
			headers: { 'content-type': 'application/json' },
			data: parkID,
		})
		.then(result => {
			this.setState({
				parkRides: result.data.rides
			})
		})
		.catch(error => console.log('error' + error));
	}

	getDateParkInfo() {
		axios({
			method: 'post',
			url: `${API_PATH}`,
			headers: { 'content-type': 'application/json' },
			data: this.state
		})
		.then(result => {
			this.setState({
				openTime: result.data.opentime,
				crowdLevel: result.data.crowdlevel
			})
		})
		.catch(error => console.log('error' + error));
	}

	// navigation between form steps
	_next() {
    let currentStep = this.state.currentStep
    // If the current step is 1, 2 or 3, then add one on "next" button click
    currentStep = currentStep >= 3? 4: currentStep + 1
    this.setState({
      currentStep: currentStep
		})

		if (currentStep == 4) {
			this.getParkReviews(this.state.parkID);
			this.getParkRides(this.state.parkID);
		}
	}
	
	_prev() {
    let currentStep = this.state.currentStep
    // If the current step is 2, 3 or 4, then subtract one on "previous" button click
    currentStep = currentStep <= 1? 1: currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }

	// The "next" and "previous" button rendering functions
	get previousButton(){
		let currentStep = this.state.currentStep;
		// If the current step is not 1 or 4, then render the "previous" button
		if(currentStep ==2 || currentStep ==3){
			return (
				<Button 
					size="lg"
					className="nav-btn-prev"
					type="button"
					color='secondary'
					onClick={this._prev}
				>
					Previous
				</Button>
			)
		}
		return null;
	}

	get nextButton(){
		let currentStep = this.state.currentStep;
		// If the current step is not 4, then render the "next" button
		if(currentStep == 1){
			return (
				<Button
					size="lg" 
					className="nav-btn-next"
					disabled={this.state.disabled1}
					type="button" onClick={this._next}>
					Next
				</Button>        
			)
		} else if(currentStep == 2){
			return (
				<Button
					size="lg" 
					className="nav-btn-next"
					disabled={this.state.disabled2}
					type="button" onClick={this._next}>
					Next
				</Button>        
			)
		} else if(currentStep == 3){
			return (
				<Button
					size="lg" 
					className="nav-btn-next"
					type="button" onClick={this._next}>
					Next
				</Button>        
			)
		}
		return null;
	}

	// construct the array to pass to the decision tree function 
	// from user inputs
	constructClassifyArray() {
		let classifyArray = [];

		// get group type
		if (this.state.group == 'Family') {
			classifyArray.push(0);
		} else if (this.state.group == 'Friends') {
			classifyArray.push(1);
		} else {
			classifyArray.push(2);
		}

		const groupCount = parseInt(this.state.visitorCount)
		// get group count 
		classifyArray.push(groupCount);

		let ages = this.state.visitorAges.slice(0, groupCount)
		// get average age
		let sum = 0;
		for(let i=0; i < ages.length; i++){
			sum+= parseInt(ages[i]);
		}
		let agesAvg = sum/ages.length;
		classifyArray.push(Math.round(agesAvg));

		// get youngest age
		const agesMin = arr => Math.min(...arr);
		classifyArray.push(agesMin(ages));

		// get wait time preference
		let	waitTime = this.state.waitTimePref.replace(/\D/g,'');
		classifyArray.push(parseInt(waitTime));

		// get regular visitor response
		if (this.state.regular == 'Strongly agree') {
			classifyArray.push(4);
		} else if (this.state.regular == 'Agree') {
			classifyArray.push(3); 
		} else if (this.state.regular == 'Neither agree nor disagree') {
			classifyArray.push(2);
		} else if (this.state.regular == 'Disagree') {
			classifyArray.push(1);
		} else {
			classifyArray.push(0);
		}

		return classifyArray
	}

	get finalStep(){
		let dateString = this.state.day + '/' + this.state.month;
		let currentStep = this.state.currentStep;

		// If the current step is 4, render the final step
		if(currentStep === 4 && this.state.parkRides && this.state.parkReviews) {
			let features = this.constructClassifyArray();

			let rides = getPreferredRides(classify(features), this.state.crowdlevel, this.state.parkRides);
			let reviews = getPreferredReviews(this.state.money, this.state.family, this.state.time,
				this.state.food, this.state.shows, this.state.comparison, this.state.seasonal,
				this.state.accomodation, this.state.theme, this.state.rides, this.state.convenience,
				this.state.parkReviews)

			// Create styles for PDF document
			const Title = styled.Text`
				margin: 15px;
				color: #4b5877;
				font-size: 22px;
				font-family: 'Helvetica';
				text-align: center;
			`;
			const Subtitle = styled.Text`
				margin: 5px;
				font-size: 18px;
				font-family: 'Helvetica';
				text-align: center;
			`;
			const styles = StyleSheet.create({
				page: {
					flexDirection: 'row',
					backgroundColor: '#FFFAFA'
				},
				section: {
					margin: 10,
					padding: 10,
					flexGrow: 1
				}
			});

			const Heading = styled.Text`
				margin: 8px;
				margin-top: 16px;
				font-size: 18px;
				font-family: 'Helvetica';
			`;
			const Description = styled.Text`
				margin: 4px;
				font-size: 12px;
				font-family: 'Helvetica';
			`;

			// define the structure and design of the PDF document
			const MyDocument = () => (
				<Document>
					<Page size="A4" style={styles.page}>
						<View style={styles.section}>
							<Title>Your visit to {this.state.park}</Title>
							<Subtitle>.....</Subtitle>
							<Subtitle> Date: {dateString} Park opens at: {this.state.openTime}</Subtitle>
							<Subtitle> Predicted crowd level is: {this.state.crowdLevel}</Subtitle>
							<Subtitle>.....</Subtitle>
							<Text> Your top 5 rides: </Text>
							{
								rides && (
									rides.map((ride, index) => 
										<>
											<Heading>{ride.name}</Heading>
											<Description>Predicted wait time: {ride.wait} minutes</Description>
											<Description>{ride.info_text}</Description>
										</>)
								) || <Heading>Rides failed to render.</Heading>
							}
						</View>
					</Page>
					<Page size="A4" style={styles.page}>
						<View style={styles.section}>
							<Text> Your top 5 reviews: </Text>
							{
								reviews && (
									reviews.map((review, index) =>
										<>
											<Heading>{review.title}</Heading>
											<Description>{review.text}</Description>
										</>)
								) || <Heading>Reviews failed to render.</Heading>
							}
						</View>
					</Page>
				</Document>
			);

			return (
				<>
					<h2>Your plan is ready!</h2>
					<h3>Click below to view it now...</h3>
					<PDFDownloadLink document={<MyDocument/>} fileName="Your Park Plan.pdf" style={{fontSize:30}}>
						{({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
					</PDFDownloadLink>
				</>   
			);
		}
		return null;
	}

	// prompt the user when trying to leave page while still planning 
	render() {
		return (
			<>
				<Prompt
					when={this.state.currentStep < 4}
					message='Are you sure you want to leave, your plan will be cancelled!'
        />
				<div className='mainDiv'>
				<HomepageImage className='homeImg' />
				<h5 className='formHeading'> Plan your dream park trip now!</h5>
				</div>
				<Row xs="1">
					<Col>
						<FormStep1 
						  mainFormCallback={this.stepOneDataCallback}
							currentStep={this.state.currentStep} 
							handleChange={this.handleChange}
						/>
						<FormStep2
							mainFormCallback={this.stepTwoDataCallback}
							currentStep={this.state.currentStep} 
							handleChange={this.handleChange}
						/>
						<FormStep3
							mainFormCallback={this.stepThreeDataCallback}
							currentStep={this.state.currentStep} 
							handleChange={this.handleChange}
						/>
					</Col>
				</Row>
				<div className='next-btn'>
					<Row xs="3">
						<Col>
							{this.previousButton}
						</Col>
						<Col>
							{this.finalStep}
						</Col>
						<Col>
							{this.nextButton}
						</Col>
					</Row>
				</div>
			</>
		);
	}
}

export default Plan;