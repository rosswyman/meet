// src/App.js

import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';

class App extends Component {
	state = {
		events: [],
		locations: [],
		numberOfEvents: 32,
	};

	updateEvents = (location) => {
		getEvents().then((events) => {
			const locationEvents =
				location === 'all'
					? events
					: events.filter((event) => event.location === location);
			const numberOfEvents = this.state.numberOfEvents;
			this.setState({ events: locationEvents.slice(0, numberOfEvents) });
		});
	};

	componentDidMount() {
		this.mounted = true;
		getEvents().then((events) => {
			if (this.mounted) {
				this.setState({ events, locations: extractLocations(events) });
			}
		});
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	render() {
		return (
			<div className="App">
				<CitySearch
					locations={this.state.locations}
					updateEvents={this.updateEvents}
				/>
				<NumberOfEvents updateEvents={this.updateEvents} />
				<EventList
					events={this.state.events}
					numberOfEvents={this.state.numberOfEvents}
				/>
			</div>
		);
	}
}

export default App;
