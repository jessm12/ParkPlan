import React, { Component } from 'react';
import '../../App.scss';
import './FormStep1.scss';
import { Col, Row, FormText, Form, FormGroup, Label, Input } from 'reactstrap';
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';

class Step1 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			year: "2019",
			month: "0",
			day: "1",
			email: ""
		};

		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
		});

		this.props.mainFormCallback(
			this.state.email,
			this.state.year,
			this.state.month,
			this.state.day
		);
  }

	render() {
		if (this.props.currentStep !== 1) { // Prop: The current step
			return null
		}
		return(
			<>
				<div>
					<Form className='getStartedForm'>
						<h5> Personal Details </h5>
						<Row form>
							<Col md={9}>
								<FormGroup>
									<Label for="email">Email</Label>
									<Input
										type="email"
										name="email"
										id="exampleEmail"
										placeholder="example@example.com"
										value={this.state.email}
										onChange={this.handleInputChange}
									/>
									<FormText> We need this so we can email you your plans! </FormText>
								</FormGroup>
							</Col>
						</Row>
						<Label>Date of Birth</Label>
						<Row form>
							<Col md={3}>
								<FormGroup>
									<Label for="year">Year</Label>
									<div>
										<YearPicker
											value={this.state.year}
											onChange={(year) => {
												this.setState({ year });
											}}
										/> 
									</div>
								</FormGroup>
							</Col>
							<Col md={3}>
								<FormGroup>
									<Label for="month">Month</Label>
									<div>
										<MonthPicker 
											year={this.state.year}
											value={this.state.month}
											onChange={(month) => {
												this.setState({ month });
											}}
										/> 
									</div>
								</FormGroup>
							</Col>
							<Col md={3}>
								<FormGroup>
									<Label for="day">Day</Label>
									<div>
										<DayPicker 
											year={this.state.year}
											month={this.state.month}
											value={this.state.day}
											onChange={(day) => {
												this.setState({ day });
											}}
										/>  
									</div>
								</FormGroup>
							</Col>
						</Row>
					</Form>
				</div>
			</>
		)
	}
}

export default Step1;