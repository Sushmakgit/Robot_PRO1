*** Settings ***
Library    SeleniumLibrary    
Suite Setup   Log    Starting Suite
Test Setup    Log    Starting Testcase
Test Teardown    Log    Closing Testcase
Suite Teardown    Log    Closing Suite  

*** Keywords ***
LoginKW
        Input Text    name=txtUsername   @{CREDENTIALS}[0]
        Input Text    name=txtPassword    &{LOGINDATA}[pwd]        
        Click Button    id=btnLogin  

*** Variables ***
${URL}    https://opensource-demo.orangehrmlive.com    #Scalar variables

@{CREDENTIALS}    admin    admin123    #List variables
&{LOGINDATA}    usr=admin    pwd=admin123       #    Dictionary variables
#${HomePageURL}

*** Test Cases ***
T1
    Open Browser    ${URL}    ff
    LoginKW   
    Location Should Contain    https://opensource-demo.orangehrmlive.com/index.php/
    Title Should Be    OrangeHRM  
    Sleep   10
    # Click Element    xpath=//b[.=("PIM")]
    # Wait Until Element Is Visible    xpath=//*[@id="empsearch_employee_name_empName"] 
    # Input Text    xpath=//*[@id="empsearch_employee_name_empName"]    Sushma K
    # Input Text    xpath=//*[@id="empsearch_id"]    31154
    # #Click Element   xpath=//*[@id="empsearch_employee_status"]
   # Select From List By Index    xpath=//*[@id="empsearch_employee_status"]    1  
   # Select From List By Index    xpath=//*[@id="empsearch_termination"]    2  
   # Select Checkbox    xpath=//*[@id="ohrmList_chkSelectRecord_4"]
   # Select Checkbox    xpath=//*[@id="ohrmList_chkSelectRecord_5"]
   
   # Click Button    xpath=//*[@id="resetBtn"]   
   # Sleep     5
   
   
   Click Element     xpath=//b[.=("Recruitment")]
   
   #wAIT TILL THE ELEMENT IS VISIBLE
    Wait Until Element Is Visible    xpath=//*[@id="candidateSearch_jobTitle"]
    
    #tO SELECT FROM THE LIST, PASS THE LOCATOR FOR THE LIST(ARG1) AND ID/LAVEL/VALUE(ARG2)   
    Select From List By Label    xpath=//*[@id="candidateSearch_jobTitle"]    CEO 
    
   Select From List By Index    xpath=//*[@id="candidateSearch_status"]    9 
   
   #TO SELECT DTE FIRST CLICK ON THE CALENDER OPTION
   Click Element    xpath=//*[@id="candidateSearch_fromDate"] 
   
   #FOR DATE, EG FOR MONTH FIRST SELECT THE CLASS WHICH IS COMMMON FOR ALL THE MONTHS AND THEN CHOOSE BY INDEX/LABEL/VAUE
   Select From List By Index    class=ui-datepicker-month    2
   Select From List By Label     class=ui-datepicker-year    1996
   
   #FOR SPECIFIC DATE , SELECT THE DATE DIRECTLY AS A LINK
   Click Link   link=6
   
   #For check box, DIRECTLY GIVE SELECT CHECKBOX WITH THE LOCATOR
   # Select Checkbox    xpath=//*[@id="ohrmList_chkSelectRecord_1_"]
   # Select Checkbox    xpath=//*[@id="ohrmList_chkSelectRecord_4_"]
   
   #TO NAVIGATE TO A DIFFERENT URL USE GO TO
   Go To    file:///home/sushma/sample123.html
   
   #TO SELECT A RADIO BUTTON, FIRST GIVE THE GROUP THAT IT BELONGS TO FOLLWED BY THE VALUE OF THAT PARTICULAR BUTTON
   Select Radio Button    software    Excel
   
    Sleep    2    
    Close Browser
    

    
    
    
    