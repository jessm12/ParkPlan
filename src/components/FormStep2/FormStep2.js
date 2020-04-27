import React, { Component } from 'react';
import '../../App.scss';
import './FormStep2.scss';
import { Col, Row, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

function Repeat(props) {
	let items = [];
	for (let i = 0; i < props.numTimes; i++) {
		items.push(props.children(i));
	}
	return <div>{items}</div>;
}

class Step2 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			group: "",
			visitorCount: null,
			visitorAges: [0,0,0,0,0,0,0,0,0,0],
			regular: '',
			waitTimePref: '',
			validateGroup: '',
			validateGroupSize: '',
			validateRegular: '',
			validateTimePref: '',
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleChangeAge = this.handleChangeAge.bind(this);
	}

	handleInputChange(event) {
    const target = event.target;
    const value = target.value;
		const name = target.name;

		console.log(name);
		console.log(value);

		let valGroup = this.state.validateGroup;
		let valReg = this.state.validateRegular;
		let valWait = this.state.validateTimePref;
		let valCount = this.state.validateGroupSize;

		// input validation
		if (name == 'group') {
			if (value == 'Select group type') {
				valGroup = 'fail'
				this.setState({
					validateGroup: valGroup
			})} else {
				valGroup = 'success'
				this.setState({
					validateGroup: valGroup
			})}
		} else if (name == 'regular') {
			if (value == 'Select a response') {
				valReg = 'fail'
				this.setState({
					validateRegular: valReg
			})} else {
				valReg = 'success'
				this.setState({
					validateRegular: valReg
			})}
		} else if (name == 'waitTimePref') {
			if (value == 'Select a response') {
				valWait = 'fail'
				this.setState({
					validateTimePref: valWait
			})} else {
				valWait = 'success'
				this.setState({
					validateTimePref: valWait
			})}
		} else if (name == 'visitorCount') {
			if( value > 10 || value < 1 ) {
				valCount = 'fail' 
			} else {
				valCount = 'success'
			}
			this.setState({
				validateGroupSize: valCount
			})
		}

		let disabled = '';
		// disable next button if any validation not met
		if (!(valGroup === 'success') || !(valReg === 'success') || 
			!(valWait === 'success') || !(valCount === 'success')) 
		{
		  disabled = true;  
		} else {
			disabled = false;
		}
		
		console.log(disabled);

    this.setState({
      [name]: value
		}, () =>
			this.props.mainFormCallback(
				this.state.group,
				this.state.visitorCount,
				this.state.visitorAges,
				this.state.regular,
				this.state.waitTimePref,
				disabled
		));
	}
	
	handleChangeAge(event) {
		let disabled = '';
		// disable next button if any validation not met
		if (!(this.state.validateGroup === 'success') || !(this.state.validateRegular === 'success') || 
			!(this.state.validateTimePref === 'success') || !(this.state.validateGroupSize === 'success')) 
		{
		  disabled = true;  
		} else {
			disabled = false;
		}
		var index = event.target.name
		var visitorAge = event.target.value;
		let visitorAges = [...this.state.visitorAges];
		visitorAges[index] = visitorAge;
		this.setState({visitorAges}, () =>
		this.props.mainFormCallback(
			this.state.group,
			this.state.visitorCount,
			this.state.visitorAges,
			this.state.regular,
			this.state.waitTimePref,
			disabled
		));
  }

	render() {
		if (this.props.currentStep !== 2) { // Prop: The current step
			return null
		}
		return(
			<>
				<div>
					<Form className='PlanForm'>
						<h4> Visitor Details </h4>
						<Row>
							<Col md={3}>
							</Col>
							<Col md={3}>
								<FormGroup>
									<Label for="VisitingGroup">Type of group: </Label>
									<Input 
										type="select" 
										name="group" 
										id="group" 
										value={this.state.group}
										onChange={this.handleInputChange}
										valid={this.state.validateGroup === 'success'}
										invalid={this.state.validateGroup === 'fail'}
									>
										<option>Select group type</option>
										<option>Family</option>
										<option>Friends</option>
										<option>Partner</option>
										<option>Other</option>
									</Input>
								</FormGroup>
							</Col>
							<Col md={3}>
								<FormGroup>
									<Label for="visitors">Group size: </Label>
									<Input
										value={this.state.visitorCount}
										type="text"
										name="visitorCount"
										id="visitorCount"
										placeholder="No. of visitors" 
										onChange={this.handleInputChange}
										valid={this.state.validateGroupSize === 'success'}
										invalid={this.state.validateGroupSize === 'fail'}
									/>
									<FormFeedback>Group size must be between 1 and 10</FormFeedback>
									<FormFeedback valid>Please ensure you enter all ages for your group!</FormFeedback>
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
									<Label>Visitor Ages: </Label>
									<Repeat numTimes={this.state.visitorCount}>
											{(index) => 
												<Input
													key={`${index+1}`}
													value={this.state.visitorAges[index]}
													type="text"
													name={`${index}`}
													id={`Visitor${index+1}Age`}
													placeholder={`Visitor ${index+1}`}
													onChange={this.handleChangeAge}
												/>
											}
    							</Repeat>
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
									<Label for="VisitingGroup">How much do you agree that your group visit theme parks regularly?</Label>
									<Input 
										type="select" 
										name="regular" 
										id="regular" 
										value={this.state.regular}
										onChange={this.handleInputChange}
										valid={this.state.validateRegular === 'success'}
										invalid={this.state.validateRegular === 'fail'}
									>
										<option>Select a response</option>
										<option>Strongly agree</option>
										<option>Agree</option>
										<option>Neither agree nor disagree</option>
										<option>Disagree</option>
										<option>Strongly disagree</option>
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
									<Label for="VisitingGroup">What's the maximum time you're willing to wait in an attraction queue?</Label>
									<Input 
										type="select" 
										name="waitTimePref" 
										id="waitTimePref" 
										value={this.state.waitTimePref}
										onChange={this.handleInputChange}
										valid={this.state.validateTimePref === 'success'}
										invalid={this.state.validateTimePref === 'fail'}
									>
										<option>Select a response</option>
										<option>30 minutes</option>
										<option>60 minutes</option>
										<option>90 minutes</option>
										<option>120 minutes</option>
									</Input>
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

export default Step2;