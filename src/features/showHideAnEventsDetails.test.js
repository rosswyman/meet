import { mount } from 'enzyme';
import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import App from '../App';
import { mockData } from '../mock-data';
import Event from '../Event';
// import EventList from '../EventList';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
	test('An event element is collapsed by default.', ({ given, when, then }) => {
		given('user has not requested event details', () => {});

		let AppWrapper;
		when('the user opens the app', () => {
			AppWrapper = mount(<App />);
		});

		then(
			'the events displayed will have the details hidden by default.',
			() => {
				AppWrapper.update();
				expect(AppWrapper.find('eventDetails')).toHaveLength(0);
			}
		);
	});

	test('User can expand an event to see its details.', ({
		given,
		when,
		then,
	}) => {
		let EventWrapper;
		given('the list of events is displayed', () => {
			EventWrapper = mount(<Event event={mockData[0]} />);
		});

		when('the user clicks on the details button', () => {
			EventWrapper.find('.expandDetailsButton').simulate('click');
		});

		then('the user should see the event details.', () => {
			expect(EventWrapper.state('showDetails')).toBeTruthy();
		});
	});

	test('User can collapse an event to hide its details.', ({
		given,
		when,
		then,
	}) => {
		let EventWrapper;
		given('user has displayed the event details', () => {
			EventWrapper = mount(<Event event={mockData[0]} />);
			EventWrapper.find('.expandDetailsButton').simulate('click');
			expect(EventWrapper.state('showDetails')).toBeTruthy();
		});

		when('the user clicks on the details button', () => {
			EventWrapper.find('.expandDetailsButton').simulate('click');
		});

		then('the event details should be hidden.', () => {
			expect(EventWrapper.state('showDetails')).toBeFalsy();
		});
	});
});
