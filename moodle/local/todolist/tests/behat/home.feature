@local @local_todolist @javascript
Feature: home
  In order to see my list of items to do
  As a user
  I need to view the TODO list home page

  Background:
    Given the following "users" exist:
      | username         | firstname | lastname  | email                        |
      | tyrion.lannister | Tyrion    | Lannister | tyrion.lannister@example.com |
    Given the user "tyrion.lannister" has the following TODO items:
      | description        | is done |
      | Feed the fish      | no      |
      | Walk the dog       | no      |
      | Clean the bathroom | yes     |
    And I log in as "tyrion.lannister"

  Scenario: View the TODO list home page
    Given I am on the TODO list home page
    Then I should see "TODO list"
    And I should see "Items"
    And I should see "Feed the fish"
    And I should see "Walk the dog"
    And I should see "Clean the bathroom"
    And I should see "Add item"
