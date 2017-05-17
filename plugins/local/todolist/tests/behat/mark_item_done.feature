@local @local_todolist @javascript
Feature: mark item done
  In order to mark a TODO item as done
  As a user
  I need to check its checkbox

  Background:
    Given the following "users" exist:
      | username         | firstname | lastname  | email                        |
      | tyrion.lannister | Tyrion    | Lannister | tyrion.lannister@example.com |
    Given the user "tyrion.lannister" has the following TODO items:
      | description        | is done | due        |
      | Feed the fish      | no      | 2017-04-30 |
    And I log in as "tyrion.lannister"
    And I am on homepage

  Scenario: Viewing a TODO list item that hasn't been marked as done
    When I click on "TODO list" "link"
    Then I should see "Due Sun, 30 Apr 2017"
    And I should see "Feed the fish"
    And the "Delete" "button" should be disabled

  Scenario: Marking a TODO list item as done
    When I click on "TODO list" "link"
    And I click on "mark" "checkbox"
    Then I should see "Done"
    And I should not see "Due Sun, 30 Apr 2017"
    And I should see "Feed the fish"
    And the "Delete" "button" should be enabled
