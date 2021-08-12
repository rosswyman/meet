Feature: Show and hide event details

  Scenario: An event element is collapsed by default.
    Given user has not requested event details
    When the user opens the app
    Then the events displayed will have the details hidden by default.

  Scenario: User can expand an event to see its details.
    Given the list of events is displayed
    When the user clicks on the details button
    Then the user should see the event details.

  Scenario: User can collapse an event to hide its details.
    Given user has displayed the event details
    When the user clicks on the details button
    Then the event details should be hidden.