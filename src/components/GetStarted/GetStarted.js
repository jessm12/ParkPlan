import React, { Component } from 'react';
import '../../App.scss';
import './GetStarted.scss';
import FormStep1 from '../FormStep1';
import FormStep2 from '../FormStep2';
import FormStep3 from '../FormStep3';
import {classify} from '../tree.js'
import Rides from '../Rides';
import { Col, Row, Button } from 'reactstrap';
import HomepageImage from '../HomepageImage'
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet  } from '@react-pdf/renderer'
import axios from 'axios';

const API_PATH = 'http://cojlm.sci-project.lboro.ac.uk/api/parkdateinfo/index.php';

class GetStarted extends Component {
	constructor(props) {
		super(props);
		this.state = {
			api: null,
			email: null,
			park: null,
			parkID: null,
			openTime: null,
			crowdLevel: null,
			day: null,
			month: null,
			group: null, 
			output: null,
			visitorCount: null,
			visitorAges: null,
			preferences: null,
			userRides: null,
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
			convenience: 0
		};
    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	stepOneDataCallback = (park, parkID, day, month) => {
		this.setState({
			park,
			parkID,
			day,
			month
		}, () =>
		this.getDateParkInfo());
	}

	stepTwoDataCallback = (group, visitorCount, visitorAges) => {
		this.setState({
			group,
			visitorCount,
			visitorAges
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

	_next() {
    let currentStep = this.state.currentStep
    // If the current step is 1, 2 or 3, then add one on "next" button click
    currentStep = currentStep >= 3? 4: currentStep + 1
    this.setState({
      currentStep: currentStep
    })
	}
	
	_prev() {
    let currentStep = this.state.currentStep
    // If the current step is 2, 3 or 4, then subtract one on "previous" button click
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
		if(currentStep <4){
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

	get finalStep(){

		// Create styles
		const styles = StyleSheet.create({
			page: {
				flexDirection: 'row',
				backgroundColor: '#E4E4E4'
			},
			section: {
				margin: 10,
				padding: 10,
				flexGrow: 1
			}
		});

		let dateString = this.state.day + '/' + this.state.month;

		// Create Document Component
		const MyDocument = () => (
			<Document>
				<Page size="A4" style={styles.page}>
					<View style={styles.section}>
						<Text>{this.state.park}</Text>
						<Text>{dateString}</Text>
						<Text>{this.state.openTime}</Text>
						<Text>{this.state.crowdLevel}</Text>
					</View>
					<View style={styles.section}>
					</View>
				</Page>
			</Document>
		);

		let currentStep = this.state.currentStep;
		// If the current step is 3, render the final step
		
		if(currentStep ===4){
			return (
				<>
					<Rides parkID={this.state.parkID} preferences={classify([0,4,31,18,30,0])}></Rides>
					<h2>Is this data correct?</h2>
					<h3>Park:</h3>
					<h3>{this.state.park}</h3>
					<h3>Crowd level:</h3>
					<h3>{this.state.crowdLevel}</h3> 
					<h3>Open time:</h3>
					<h3>{this.state.openTime}</h3> 
					<h3>Date:</h3> 
					<h3>{dateString}</h3> 
					<PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
						{({ loading }) => (loading ? 'Loading document...' : 'Download now!')}
					</PDFDownloadLink>
				</>   
			)
		}
		return null;
	}

	render() {
		return (
			<>
				<div className='mainDiv'>
				<HomepageImage className='homeImg' />
				<h5 className='formHeading'> Before you can get started planning your dream park trip we'll need some info from you!</h5>
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

export default GetStarted;