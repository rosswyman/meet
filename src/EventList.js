// src/EventList.js

import React, { Component } from 'react';
import Event from './Event';

class EventList extends Component {
	render() {
		const { events } = this.props;
		const { numberOfEvents } = this.props;
		const limitedNumberOfEvents = events.slice(0, numberOfEvents);

		return (
			<ul className="EventList">
				{limitedNumberOfEvents.map((event) => (
					<li key={event.id}>
						<Event event={event} />
					</li>
				))}
			</ul>
		);
	}
}

export default EventList;
