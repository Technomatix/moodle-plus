@local @local_todolist @javascript
Feature: delete item
  In order to delete a TODO item
  As a user
  I need to mark it as done then click 'Delete'

  Background:
    Given the following "users" exist:
      | username         | firstname | lastname  | email                        |
      | tyrion.lannister | Tyrion    | Lannister | tyrion.lannister@example.com |
    Given the user "tyrion.lannister" has the following TODO items:
      | description  | is done | due        |
      | Wash the car | no      | 2017-05-30 |
    And I log in as "tyrion.lannister"
    And I am on homepage

  Scenario: Deleting a TODO list item
    When I click on "TODO list" "link"
    Then I should see "Due Tue, 30 May 2017"
    And I should see "Wash the car"
    And I should see "Delete"
    And the "Delete" "button" should be disabled
    When I click on "mark" "checkbox"
    Then I should see "Done"
    And I should see "Wash the car"
    And the "Delete" "button" should be enabled
    When I click on "Delete" "button"
    Then I should not see "Done"
    And I should not see "Wash the car"
