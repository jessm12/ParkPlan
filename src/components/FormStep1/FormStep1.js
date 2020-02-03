import React, { Component } from 'react';
import '../../App.scss';
import './FormStep1.scss';
import { Col, Row, FormText, Form, 
	FormGroup, Label, Input } from 'reactstrap';
import Calendar from 'react-calendar';

class Step1 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			park: "",
			date: new Date()
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	handleInputChange(event) {
    const target = event.target;
    const value = target.value;
		const name = target.name;

    this.setState({
      [name]: value
		}, () => {
			this.props.mainFormCallback(
				this.state.email,
				this.state.park,
				this.state.date
			);
		})
	}
	
	onChange(date){
		this.setState({
			date }, () => {
			this.props.mainFormCallback(
				this.state.email,
				this.state.park,
				this.state.date
			);
		})
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
						<Row form>
							<Col md={5}>
								<FormGroup>
									<Label for="ParkSelection">Which park would you like to visit?</Label>
									<Input 
										type="select" 
										name="park" 
										id="park" 
										value={this.state.park}
										onChange={this.handleInputChange}
									>
										<option>Magic Kingdom Park - Florida, USA</option>
										<option>Disney's Hollywood Studios - Florida, USA</option>
										<option>Epcot - Florida, USA</option>
										<option>Disneyland Paris - France</option>
										<option>PortAventura Park - Spain</option>
									</Input>
								</FormGroup>
							</Col>
						</Row>
						<Row form>
							<Col md={5}>
								<FormGroup>
									<Label for="DateSelection">When would you like to visit?</Label>
									<Calendar
										name="date"
										onChange={this.onChange}
										value={this.state.date}
        					/>
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