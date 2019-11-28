import React, { Component } from 'react';
import '../../App.scss';
import HomepageImage from '../HomepageImage'
import './GetStarted.scss';
import { Col, Button, Row, FormText, Form, FormGroup, Label, Input } from 'reactstrap';
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';

class GetStarted extends Component {
	constructor(props) {
		super(props);
		this.state = { year: null, month: null, day: null };
	}

	render() {
		return (
			<>
				<div className='mainDiv'>
					<HomepageImage className='homeImg' />
					<h5 className='formHeading'> Before you can get started planning your dream park trip we'll need some info from you!</h5>
				</div>
				<div>
					<Form className='getStartedForm'>
						<Row form>
							<Col md={6}>
								<FormGroup>
									<Label for="email">Email</Label>
									<Input type="email" name="email" id="exampleEmail" placeholder="example@example.com" />
									<FormText> We need this so we can email you your plans! </FormText>
								</FormGroup>
							</Col>
						</Row>
						<Label>Date of Birth</Label>
						<Row form>
							<Col md={2}>
								<FormGroup>
									<Label for="year">Year</Label>
									<div>
										<YearPicker 
											value={this.state.year}
											onChange={(year) => {
                        this.setState({ year });
                        console.log(year);
                    	}}
										/> 
									</div>
								</FormGroup>
							</Col>
							<Col md={2}>
								<FormGroup>
									<Label for="month">Month</Label>
									<div>
										<MonthPicker 
											year={this.state.year}
											value={this.state.month}
											onChange={(month) => {
                        this.setState({ month });
                        console.log(month);
                    	}}
										/> 
									</div>
								</FormGroup>
							</Col>
							<Col md={2}>
								<FormGroup>
									<Label for="day">Day</Label>
									<div>
										<DayPicker 
											year={this.state.year}
											month={this.state.month}
											value={this.state.day}
											onChange={(day) => {
                        this.setState({ day });
                        console.log(day);
                    	}}
										/>  
									</div>
								</FormGroup>
							</Col>
						</Row>
						<Button>Submit</Button>
					</Form>
				</div>
			</>
		);
	}
}

export default GetStarted;