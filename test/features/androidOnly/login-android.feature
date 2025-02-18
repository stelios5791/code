Feature: Login into app
  As a player I should be able to login if i provide valid credentials

  Scenario: Player should verify Login Screen layout with no credentials and should not see Register button when is logged in
    Given The app is loaded
    And all components are displayed
    Then I am on PlayHub screen
    And I should see register header button
    And I should see the Find Out More title
    And I should see "registerNow" promo card
    When I navigate to Login screen
    And I compare screen Login_Screen_No_Credentials
    When I login
    Then I am on PlayHub screen
