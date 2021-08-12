// src/__tests__/EndToEnd.test.js

import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
	let browser;
	let page;
	beforeAll(async () => {
		jest.setTimeout(30000);
		browser = await puppeteer.launch();
		page = await browser.newPage();
		await page.goto('http://localhost:3000/');
		await page.waitForSelector('.event');
	});

	afterAll(() => {
		browser.close();
	});

	test('An event element is collapsed by default', async () => {
		const eventDetails = await page.$('.event .event__Details');
		expect(eventDetails).toBeNull();
	});

	test('User can expand an event to see its details', async () => {
		await page.click('.event .expandDetailsButton');
		const eventDetails = await page.$('.event .expandDetailsButton');
		expect(eventDetails).toBeDefined();
	});

	test('User can collapse an event to hide its details', async () => {
		await page.click('.event .expandDetailsButton');
		const eventDetails = await page.$('.event .event__Details');
		expect(eventDetails).toBeNull();
	});
});

describe('filter events by city', () => {
	let browser;
	let page;
	jest.setTimeout(30000);
	beforeAll(async () => {
		browser = await puppeteer.launch();
		page = await browser.newPage();
		await page.goto('http://localhost:3000/');
		await page.waitForSelector('.event');
	});

	afterAll(() => {
		browser.close();
	});

	test('When user hasn’t searched for a city, show upcoming events from all cities.', async () => {
		const event = await page.$('.event');
		expect(event).toBeDefined();
	});

	test('User should see a list of suggestions when they search for a city', async () => {
		const targetCity = await page.$('.city');
		await targetCity.type('berlin');
		const suggestions = await page.$('.suggestions li');
		expect(suggestions).toBeDefined();
	});

	test('User can select a city from the suggested list', async () => {
		await page.click('.suggestions li');
		const event = await page.$('.event');
		expect(event).toBeDefined();
	});
});
