Feature: User defines number of events to display

  Scenario: 32 events are shown by default.
    Given user has not specified the number of events to display
    When the user views the list of events
    Then the list of events will show 32 events by default.

  Scenario: User can change number of events to view.
    Given the list of events is displayed
    When the user changes the number of events to view
    Then the number of events displayed should match the user selection.