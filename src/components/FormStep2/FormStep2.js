import React, { Component } from 'react';
import '../../App.scss';
import './FormStep2.scss';
import { Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';

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
			visitorCount: 1,
			visitorAges: [0,0,0,0,0,0,0,0,0,0],
			regular: 'Neither agree nor disagree',
			waitTimePref: 30
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleInputChange = this.handleChange.bind(this);
		this.handleChangeAge = this.handleChangeAge.bind(this);
	}

	handleChange(event) {
		var name = event.target.name
		this.setState({[name]: event.target.value}, () =>
		this.props.mainFormCallback(
			this.state.group,
			this.state.visitorCount,
			this.state.visitorAges,
			this.state.regular,
			this.state.waitTimePref
		));
	}

	handleInputChange(event) {
    const target = event.target;
    const value = target.value;
		const name = target.name;

    this.setState({
      [name]: value
		}, () =>
			this.props.mainFormCallback(
				this.state.group,
				this.state.visitorCount,
				this.state.visitorAges,
				this.state.regular,
				this.state.waitTimePref
			));
	}
	
	handleChangeAge(event) {
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
			this.state.waitTimePref
		));
  }

	render() {
		if (this.props.currentStep !== 2) { // Prop: The current step
			return null
		}
		return(
			<>
				<div>
					<Form className='getStartedForm'>
						<h5> Visitor Details </h5>
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
									>
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
										onChange={this.handleChange}
									/>
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
									>
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
									>
										<option>30 minutes</option>
										<option>60 minutes</option>
										<option>90 minutes</option>
										<option>120 minutes</option>
										<option>150 minutes</option>
										<option>150+ minutes</option>
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