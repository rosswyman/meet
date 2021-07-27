# meet

## Purpose:

To build a serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique. The application uses the Google Calendar API to fetch upcoming events.

## URL Address:

https://rosswyman.github.io/meet

## Dependencies:

@testing-library/jest-dom  
@testing-library/react
@testing-library/user-event  
react  
react-dom  
react-scripts  
web-vitals  
workbox-background-sync  
workbox-broadcast-update  
workbox-cacheable-response  
workbox-core  
workbox-expiration  
workbox-google-analytics  
workbox-navigation-preload  
workbox-precaching  
workbox-range-requests  
workbox-routing  
workbox-strategies  
workbox-streams

## User Stories

### Feature 2

#### Scenario 1

As a user  
I should be able to see a collapsed event element by default  
So that I can see that there are avialable details without cluttering my view of the app

#### Scenario 2

As a user  
I should be able to expand a collapsed event element  
So that I can see the event details

#### Scenario 3

As a user  
I should be able to collapse an expanded event element  
So that I can hide the event details to declutter my view of the app

### Feature 3

#### Scenario 1

As a user  
I should see 32 events by default when viewing the app  
So that I can see a variety of events without additional step

#### Scenario 2

As a user  
I should be able to specify the number of events that I want to see  
So that I can view a comfortable number of events at a given time

### Feature 4

#### Scenario 1

As a user  
I should be be able to view cached data when offline  
So that I can view previous loaded events without internet access

#### Scenario 2

As a user  
I should see an error message if I change the event settings while offline  
So that I know that I currently cannot see events due to being offline

### Feature 5

#### Scenario 1

As a user  
I should see a chart with the number of upcoming events in each city  
So that I can gauge the relative number of activities occuring in multiple locations

## Scenarios

FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS

*Scenario 1: An event element is collapsed by default  
*Scenario 2: User can expand an event to see its details  
\*Scenario 3: User can collapse an event to hide its details

FEATURE 3: SPECIFY NUMBER OF EVENTS

*Scenario 1: When user hasn’t specified a number, 32 is the default number  
*Scenario 2: User can change the number of events they want to see

FEATURE 4: USE THE APP WHEN OFFLINE

*Scenario 1: Show cached data when there’s no internet connection  
*Scenario 2: Show error when user changes the settings (city, time range)

FEATURE 5: DATA VISUALIZATION

\*Scenario 1: Show a chart with the number of upcoming events in each city
