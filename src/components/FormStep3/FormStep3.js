import React, { Component } from 'react';
import '../../App.scss';
import './FormStep3.scss';
import { Row, Form, Col } from 'reactstrap';
import Likert from 'react-likert-scale';

class Step3 extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
	}

	// data callback to main form
	handleCallback() {
		this.props.mainFormCallback(
			this.state.money,
			this.state.family,
			this.state.time, 
			this.state.food,
			this.state.shows,
			this.state.comparison,
			this.state.seasonal,
			this.state.accomodation,
			this.state.theme,
			this.state.rides,
			this.state.convenience,
		);
	}


	render() {
		if (this.props.currentStep !== 3) { // Prop: The current step
			return null
		}

		const responses = [
			{ value: 0, text: "None" },
			{ value: 0.5, text: "Some" },
			{ value: 1, text: "Lots" },
		]

		// define likert scale options
		
		const moneyLikertOptions = {
			question: "Costs and money tips?",
			picked: val => {
				this.setState({
					money: val
				}, () =>
					this.handleCallback()
				)
			}
		};

		const familyLikertOptions = {
			question: "Family options at the park?",
			picked: val => {
				this.setState({
					family: val
				}, () =>
					this.handleCallback()
				)
			}
		};

		const timeLikertOptions = {
			question: "Time considerations for your visit?",
			picked: val => {
				this.setState({
					time: val
				}, () =>
					this.handleCallback()
			 	)
			}
		};
		
		const foodLikertOptions = {
			question: "Food at the park?",
			picked: val => {
				this.setState({
					food: val
				}, () =>
					this.handleCallback()
			 	)
			}
		};

		const showsLikertOptions = {
			question: "Shows at the park?",
			picked: val => {
				this.setState({
					shows: val
				}, () =>
					this.handleCallback()
			 	)
			}
		};

		const comparisonLikertOptions = {
			question: "Comparison against other parks?",
			picked: val => {
				this.setState({
					comparison: val
				}, () =>
					this.handleCallback()
			 	)
			}
		};

		const seasonalLikertOptions = {
			question: "Seasonal events at the park?",
			picked: val => {
				this.setState({
					seasonal: val
				}, () =>
					this.handleCallback()
			 	)
			}
		};

		const accomodationLikertOptions = {
			question: "Accomodation for your visit?",
			picked: val => {
				this.setState({
					accomodation: val
				}, () =>
					this.handleCallback()
			 	)
			}
		};

		const themeLikertOptions = {
			question: "Park theming?",
			picked: val => {
				this.setState({
					theme: val
				}, () =>
					this.handleCallback()
			 	)
			}
		};

		const ridesLikertOptions = {
			question: "Rides at the park?",
			picked: val => {
				this.setState({
					rides: val
				}, () =>
					this.handleCallback()
			 	)
			}
		};

		const convenienceLikertOptions = {
			question: "Convenience tips and options at the park?",
			picked: val => {
				this.setState({
					convenience: val
				}, () =>
					this.handleCallback()
			 	)
			}
		};

		return(
			<>
				<div>
					<Form className='PlanForm'>
						<h4> How much would you like to know about...? </h4>
						<h6> Ensure you click your response to each question. </h6>
						<Row>
							<Col md="3">
							</Col>
							<Col md="6">
								<Likert
									responses={responses}
									{...moneyLikertOptions}
								/>
								<Likert
									responses={responses}
									{...familyLikertOptions}
								/>
								<Likert
									responses={responses}
									{...timeLikertOptions}
								/>
								<Likert
									responses={responses}
									{...foodLikertOptions}
								/>
								<Likert
									responses={responses}
									{...showsLikertOptions}
								/>
								<Likert
									responses={responses}
									{...comparisonLikertOptions}
								/>
								<Likert
									responses={responses}
									{...seasonalLikertOptions}
								/>
								<Likert
									responses={responses}
									{...accomodationLikertOptions}
								/>
								<Likert
									responses={responses}
									{...themeLikertOptions}
								/>
								<Likert
									responses={responses}
									{...ridesLikertOptions}
								/>
								<Likert
									responses={responses}
									{...convenienceLikertOptions}
								/>
							</Col>
							<Col md="3">
							</Col>
						</Row>
					</Form>
				</div>
			</>
		)
	}
}

export default Step3;