import React, { Component } from 'react';
import '../../App.scss';
import './FormStep1.scss';
import { Col, Row, Form, 
	FormGroup, Label, Input } from 'reactstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';

// extract park name from its ID
function extractID(value) {
	var ID = null;
	if (value == "Disneyland Paris - France")
		ID = 4;
	else if (value == "Disney's Hollywood Studios - Florida, USA") 
		ID = 7;
	else if (value == "Epcot - Florida, USA")
		ID = 5;
	else if (value == "Magic Kingdom Park - Florida, USA")
		ID = 6;
	else
		ID = 19;
	return ID;
}
	
class Step1 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			park: "",
			parkID: 0,
			date: new Date(),
			validatePark: ''
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleInputChange(event) {
    const target = event.target;
    const value = target.value;
		const name = target.name;

		// validate form input
		let valPark = this.state.validatePark;
		if (value == 'Select a park') {
			valPark = 'fail'
			this.setState({
				validatePark: valPark
		})} else {
			valPark= 'success'
			this.setState({
				validatePark: valPark
		})}

		let disabled = '';
		// disable next button if any validation not met
		if (!(valPark === 'success'))
		{
		  disabled = true;  
		} else {
			disabled = false;
		}

		var ID = extractID(value);

		var month = this.state.date.getMonth() + 1;

		// perform callback of data to main form
    this.setState({
			[name]: value,
			parkID: ID 
		}, () =>
			this.props.mainFormCallback(
				this.state.park,
				this.state.parkID,
				this.state.date.getDate(),
				month,
				disabled
			));
	}
	
	handleChange(date){
		let disabled = '';
		// disable next button if any validation not met
		if (!(this.state.validatePark === 'success'))
		{
		  disabled = true;  
		} else {
			disabled = false;
		}
		
		var month = this.state.date.getMonth() + 1;

		this.setState({date}, () =>
			this.props.mainFormCallback(
				this.state.park,
				this.state.parkID,
				this.state.date.getDate(),
				month,
				disabled
			));
	}

	render() {
		if (this.props.currentStep !== 1) { // Prop: The current step
			return null
		}
		return(
			<>
				<div>
					<Form className='PlanForm'>
						<h4> Visit Details </h4>
						<Row>
							<Col md={3}>
							</Col>
							<Col md={6}>
								<FormGroup>
									<Label for="ParkSelection">Choose a park to visit: </Label>
									<Input 
										type="select" 
										name="park" 
										id="park" 
										value={this.state.park}
										onChange={this.handleInputChange}
										valid={this.state.validatePark == 'success'}
										invalid={!this.state.validatePark == 'fail'}
									>
										<option>Select a park</option>
										<option>Magic Kingdom Park - Florida, USA</option>
										<option>Disney's Hollywood Studios - Florida, USA</option>
										<option>Epcot - Florida, USA</option>
										<option>Disneyland Paris - France</option>
										<option>PortAventura Park - Spain</option>
									</Input>
								</FormGroup>
							</Col>
							<Col md={3}>
							</Col>
						</Row>
						<Row>
							<Col md={3}>
							</Col>
							<Col md={6}>
								<FormGroup>
									<Label for="DateSelection">Choose a date to visit: </Label>
									<DayPickerInput 
										formatDate={formatDate}
										parseDate={parseDate}
										placeholder={`${formatDate(new Date())}`}
										onDayChange={this.handleChange}
										value={this.state.date}
									/>
								</FormGroup>
							</Col>
							<Col md={3}>
							</Col>
						</Row>
					</Form>
				</div>
			</>
		)
	}
}

export default Step1;