// src/NumberOfEvents.js

import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
	state = {
		numberOfEvents: 32, // default value
	};

	handleInputChanged = (event) => {
		const value = event.target.value;
		if (value < 0 || value > 32) {
			this.setState({
				numberOfEvents: value,
				errorText: 'Please enter a value between 0 and 32',
			});
		} else {
			this.props.updateNumberOfEvents(value);
			return this.setState({
				numberOfEvents: value,
				errorText: '',
			});
		}
	};

	render() {
		return (
			<div className="numberOfEvents">
				Number of Events
				<ErrorAlert text={this.state.errorText} />
				<input
					type="number"
					className="numberOfEventsInput"
					value={this.state.numberOfEvents}
					onChange={this.handleInputChanged}
				/>
			</div>
		);
	}
}

export default NumberOfEvents;
