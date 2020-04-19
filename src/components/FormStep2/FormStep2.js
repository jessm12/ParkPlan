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
			visitorAges: [0,0,0,0,0,0,0,0,0,0]
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
			this.state.visitorCount
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
				this.state.visitorAges
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
			this.state.visitorAges
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
						<Row form xs="3">
							<Col>
							</Col>
							<Col>
								<FormGroup>
									<Label for="VisitingGroup">Which type of group are you visiting with?</Label>
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
							<Col>
							</Col>
						</Row>
						<Row form xs="3">
							<Col>
							</Col>
							<Col>
								<FormGroup>
									<Label for="visitors">Number of visitors (including yourself, maximum six)?</Label>
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
							<Col>
							</Col>
						</Row>
						<Row form xs="3">
							<Col>
							</Col>
							<Col>
								<FormGroup>
									<Label>Visitor Ages</Label>
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
							<Col>
							</Col>
						</Row>
					</Form>
				</div>
			</>
		)
	}
}

export default Step2;