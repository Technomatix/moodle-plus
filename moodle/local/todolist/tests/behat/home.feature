@local @local_todolist @javascript
Feature: home
  In order to see my list of TODO items
  As a user
  I need to view the TODO list home page

  Background:
    Given the following "users" exist:
      | username         | firstname | lastname  | email                        |
      | tyrion.lannister | Tyrion    | Lannister | tyrion.lannister@example.com |
    Given the user "tyrion.lannister" has the following TODO items:
      | description        | is done | due        |
      | Feed the fish      | no      | 2017-04-30 |
      | Walk the dog       | no      | 2017-05-01 |
      | Clean the bathroom | no      | 2017-05-02 |
    And I log in as "tyrion.lannister"
    And I am on homepage

  Scenario: Viewing the TODO list home page
    When I click on "TODO list" "link"
    Then I should see "Items"
    And I should see "Due Sun, 30 Apr 2017"
    And I should see "Feed the fish"
    And I should see "Due Mon, 01 May 2017"
    And I should see "Walk the dog"
    And I should see "Due Tue, 02 May 2017"
    And I should see "Clean the bathroom"
