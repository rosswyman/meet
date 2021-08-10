// src/__tests__/NumberOfEvents.test.js

import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
	let NumberOfEventsWrapper;
	beforeAll(() => {
		NumberOfEventsWrapper = shallow(
			<NumberOfEvents updateNumberOfEvents={() => {}} />
		);
	});

	test('render number of events text input', () => {
		expect(NumberOfEventsWrapper.find('.numberOfEventsInput')).toHaveLength(1);
	});

	test('renders default number of events equal to 32', () => {
		expect(
			NumberOfEventsWrapper.find('.numberOfEventsInput').prop('value')
		).toBe(32);
	});

	test('change state when text input changes', () => {
		const numberOfEventsObject = { target: { value: 10 } };
		NumberOfEventsWrapper.find('.numberOfEventsInput').simulate(
			'change',
			numberOfEventsObject
		);
		expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(10);
	});
});
