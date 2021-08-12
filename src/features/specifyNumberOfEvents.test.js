import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';
import React from 'react';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
	test('32 events are shown by default.', ({ given, when, then }) => {
		given('user has not specified the number of events to display', () => {});

		let AppWrapper;
		when('the user views the list of events', () => {
			AppWrapper = mount(<App />);
		});

		then('the list of events will show 32 events by default.', () => {
			AppWrapper.update();
			expect(AppWrapper.find('.event')).toHaveLength(32);
		});
	});

	test('User can change number of events to view.', ({ given, when, then }) => {
		let AppWrapper;

		given('the list of events is displayed', () => {
			AppWrapper = mount(<App />);
		});

		when('the user changes the number of events to view', () => {
			AppWrapper.update();

			AppWrapper.find('.numberOfEventsInput').simulate('change', {
				target: { value: 5 },
			});
		});

		then(
			'the number of events displayed should match the user selection.',
			() => {
				AppWrapper.update();
				expect(AppWrapper.find('.event')).toHaveLength(5);
			}
		);
	});
});
