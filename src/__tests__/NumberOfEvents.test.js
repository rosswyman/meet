// src/__tests__/NumberOfEvents.test.js

import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
	test('render number of events text input', () => {
		const NumberOfEventsWrapper = shallow(<NumberOfEvents />);
		expect(NumberOfEventsWrapper.find('.numberOfEventsInput')).toHaveLength(1);
	});

	test('renders default number of events equal to 32', () => {
		const NumberOfEventsWrapper = shallow(<NumberOfEvents />);
		expect(
			NumberOfEventsWrapper.find('.numberOfEventsInput').prop('value')
		).toBe(32);
	});

	test('change state when text input changes', () => {
		const NumberOfEventsWrapper = shallow(<NumberOfEvents />);
		const numberOfEventsObject = { target: { value: 10 } };
		NumberOfEventsWrapper.find('.numberOfEventsInput').simulate(
			'change',
			numberOfEventsObject
		);
		expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(10);
	});
});
