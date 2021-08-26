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
import {
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import EventGenre from './EventGenre';

class App extends Component {
	state = {
		events: [],
		locations: [],
		numberOfEvents: 32,
		showWelcomeScreen: undefined,
		selectedCity: 'all',
	};

	updateEvents = (location, eventCount) => {
		console.log(location);
		console.log(eventCount);
		getEvents().then((events) => {
			const locationEvents =
				location === 'all'
					? events
					: events.filter((event) => event.location === location);
			this.setState({
				events: locationEvents.slice(0, eventCount),
				numberOfEvents: eventCount,
				selectedCity: location,
			});
		});
	};

	updateNumberOfEvents = (eventCount) => {
		// const { query } = this.state;
		this.updateEvents(this.state.selectedCity, eventCount);
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

	getData = () => {
		const { locations, events } = this.state;
		const data = locations.map((location) => {
			const number = events.filter((event) => event.location === location)
				.length;
			const city = location.split(', ').shift();
			return { city, number };
		});
		return data;
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
		const { events } = this.state;
		if (this.state.showWelcomeScreen === undefined)
			return <div className="App" />;
		return (
			<div className="App">
				<WarningAlert text={this.state.warningText} />
				<CitySearch
					locations={this.state.locations}
					updateEvents={this.updateEvents}
					numberOfEvents={this.state.numberOfEvents}
				/>
				<NumberOfEvents updateNumberOfEvents={this.updateNumberOfEvents} />
				<div className="data-vis-wrapper">
					<EventGenre events={events} />
					<ResponsiveContainer height={400}>
						<ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis type="category" dataKey="city" name="city" />
							<YAxis type="number" dataKey="number" name="number of events" />
							<Tooltip cursor={{ strokeDasharray: '3 3' }} />
							<Scatter data={this.getData()} fill="#8884d8" />
						</ScatterChart>
					</ResponsiveContainer>
				</div>

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
