import React, { Component } from 'react';
import '../../App.scss';
import './FormStep2.scss';
import HomepageImage from '../HomepageImage'
import { Col, Row, FormText, Form, FormGroup, Label, Input } from 'reactstrap';
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';

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
			visitorCount: 1,
			age: []
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		var name = event.target.name
    this.setState({[name]: event.target.value});
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
						<Row form>
							<Col md={9}>
								<FormGroup>
									<Label for="visitors">Number of visitors (including yourself)?</Label>
									<Input
										value={this.state.visitorCount}
										type="text"
										name="visitorCount"
										id="visitors"
										placeholder="No. of visitors" 
										onChange={this.handleChange}
									/>
								</FormGroup>
							</Col>
						</Row>
						<Row form>
							<Col md={3}>
								<FormGroup>
									<Label>Visitor Ages</Label>
									<Repeat numTimes={this.state.visitorCount}>
											{(index) => 
												<>
													<Input
														value={this.state.age[index]}
														type="text"
														name="visitors"
														id="visitors"
														placeholder={`Visitor ${index+1}`}
													/>
												</>
											}
    							</Repeat>
								</FormGroup>
							</Col>
						</Row>
					</Form>
				</div>
			</>
		)
	}
}

export default Step2;