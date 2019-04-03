*** Settings ***
Library    SeleniumLibrary
Suite Setup    Log    In SUITE setup
Suite Teardown    Close Browser
Test Setup    Log    In TEST setup
Test Teardown    Log    In TEST teardown    
Default Tags    0

*** Test Cases ***
Testcase1
    Log   Hello World...
    
    
    
T2
        [Tags]    1
        #Create Webdriver    Firefox    /home/sushma/Downloads/geckodriver-v0.24.0-linux64/geckodriver
        Open Browser    https://Google.com   ff
        Set Browser Implicit Wait    5
        Input Text    name=q    GLOBAL EDGE SOFT
        Press Keys    name=q    ESCAPE
        Click Button    xpath=/html/body/div/div[3]/form/div[2]/div/div[3]/center/input[1]
        Sleep    2
        Close Browser
        
#T3
       # Open Browser     https://google.com    ff
       # Click Link    Sign in

       #Input Text    id=identifierId    sushmak0603
       # Set Browser Implicit Wait    2
       # Click Element  id=identifierNext
      #  Wait Until Element Is Visible    name=password          
       # Input Text    name=password    
       # Set Browser Implicit Wait    2
       # Click Element     id=passwordNext
       # Sleep     5    
        #Click Link
        #Close Browser
        
T4
        [Tags]    4
        Open Browser    ${URL}    ff
        Wait Until Element Is Visible    name=txtUsername    
        LoginKW
       # Wait Until Element Is Visible    class="panelTrigger activated-welcome"  
      # Press Key     id=welcome    ENTER
       #Press Key    XPATH=//*[@id="welcome-menu"]/ul/li[2]/a    ENTER
        #Click Link    XPATH=//*[@id="welcome-menu"]/ul/li[2]/a   
       # Close Browser
        Click Element    id=welcome    
        Click Element    link=logout
        #Click Link    link=logout
     
        
*** Variables ***
${URL}    https://opensource-demo.orangehrmlive.com    #Scalar variables
@{CREDENTIALS}    admin    admin123    #List variables
&{LOGINDATA}    usr=admin    pwd=admin123

*** Keywords ***
LoginKW
        Input Text    name=txtUsername   @{CREDENTIALS}[0]
        Input Text    name=txtPassword    &{LOGINDATA}[pwd]        
        Click Button    id=btnLogin


        