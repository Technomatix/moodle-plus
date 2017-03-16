@local @local_todolist @javascript
Feature: add item
  In order to add a TODO item
  As a user
  I need to fill out its due date and description

  Background:
    Given the following "users" exist:
      | username         | firstname | lastname  | email                        |
      | tyrion.lannister | Tyrion    | Lannister | tyrion.lannister@example.com |
    And I log in as "tyrion.lannister"

  Scenario: Not filling out form leaves the 'Save' button disabled
    Given I am on homepage
    When I click on "TODO list" "link"
    Then I should see "Add item"
    And the "Save" "button" should be disabled

  Scenario: Filling out form enables the 'Save' button
    Given I am on homepage
    When I click on "TODO list" "link"
    When I add a new item with due date "2017-01-31" and description "Vacuum the car"
    Then the "Save" "button" should be enabled

  Scenario: Filling out form and clicking 'Save' adds item
    Given I am on homepage
    When I click on "TODO list" "link"
    And I add a new item with due date "2017-02-28" and description "Feed the fish"
    And I click on "Save" "button"
    Then I should see "Due Tue, 28 Feb 2017"
    And I should see "Feed the fish"
