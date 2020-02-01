import React, { Component } from 'react';
import '../../App.scss';
import './FormStep1.scss';
import { Col, Row, FormText, Form, FormGroup, Label, Input } from 'reactstrap';

class Step1 extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
		}, () => {
			this.props.mainFormCallback(
				this.state.email,
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
					</Form>
				</div>
			</>
		)
	}
}

export default Step1;