// src/__tests__/Event.test.js
// When event is collapsed, user should see:
// -summary
// -start time
// -location
// -button to expand event details

import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
	let EventWrapper;
	beforeAll(() => {
		EventWrapper = shallow(<Event event={mockData[0]} />);
	});

	test('render event summary', () => {
		expect(EventWrapper.find('.eventSummary')).toHaveLength(1);
	});

	test('render event start time', () => {
		expect(EventWrapper.find('.eventStartTime')).toHaveLength(1);
	});

	test('render event location', () => {
		expect(EventWrapper.find('.eventLocation')).toHaveLength(1);
	});

	test('render expand details button', () => {
		expect(EventWrapper.find('.expandDetailsButton')).toHaveLength(1);
	});

	test('change state when show/hide details button clicked', () => {
		EventWrapper.setState({
			showDetails: false,
		});
		EventWrapper.find('.expandDetailsButton').simulate('click');
		expect(EventWrapper.state('showDetails')).toBe(true);
	});
});
