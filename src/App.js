// src/App.js

import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import { WarningAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';

class App extends Component {
	state = {
		events: [],
		locations: [],
		numberOfEvents: 32,
		showWelcomeScreen: undefined,
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

	updateNumberOfEvents = (eventCount) => {
		this.setState({ numberOfEvents: eventCount });
	};

	checkOnlineStatus = () => {
		if (!navigator.onLine) {
			this.setState({
				warningText:
					'ALERT: NO INTERNET CONNECTION.  DISPLAYING CACHED EVENTS.',
			});
		} else {
			this.setState({ warningText: '' });
		}
	};

	async componentDidMount() {
		this.mounted = true;
		const accessToken = localStorage.getItem('access_token');
		const isTokenValid = (await checkToken(accessToken)).error ? false : true;
		const searchParams = new URLSearchParams(window.location.search);
		const code = searchParams.get('code');
		this.setState({ showWelcomeScreen: !(code || isTokenValid) });
		if ((code || isTokenValid) && this.mounted) {
			getEvents().then((events) => {
				if (this.mounted) {
					this.setState({ events, locations: extractLocations(events) });
				}
			});
		}
		window.addEventListener('offline', this.checkOnlineStatus);
		window.addEventListener('online', this.checkOnlineStatus);
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	render() {
		if (this.state.showWelcomeScreen === undefined)
			return <div className="App" />;
		return (
			<div className="App">
				<WarningAlert text={this.state.warningText} />
				<CitySearch
					locations={this.state.locations}
					updateEvents={this.updateEvents}
				/>
				<NumberOfEvents updateNumberOfEvents={this.updateNumberOfEvents} />
				<EventList
					events={this.state.events}
					numberOfEvents={this.state.numberOfEvents}
				/>
				<WelcomeScreen
					showWelcomeScreen={this.state.showWelcomeScreen}
					getAccessToken={() => {
						getAccessToken();
					}}
				/>
			</div>
		);
	}
}

export default App;
