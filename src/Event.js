// src/Event.js

import React, { Component } from 'react';

class Event extends Component {
	state = {
		showDetails: false,
	};

	showDetails() {
		if (this.state.showDetails === false) {
			this.setState({ showDetails: true });
		} else {
			this.setState({ showDetails: false });
		}
	}

	showDescription(event) {
		if (this.state.showDetails === true) {
			return event.details;
		} else {
			return '';
		}
	}

	render() {
		const { event } = this.props;
		return (
			<div className="event">
				<h2 className="eventSummary">{event.summary}</h2>
				<p className="eventStartTime">
					{event.start.dateTime}+' '+{event.start.timeZone}
				</p>
				<p className="eventLocation">{event.location}</p>
				<p className="eventDesciption">{this.showDescription}</p>
				<button
					className="expandDetailsButton"
					onClick={() => {
						this.showDetails(event);
					}}
				>
					Show/Hide Details
				</button>
			</div>
		);
	}
}
export default Event;
