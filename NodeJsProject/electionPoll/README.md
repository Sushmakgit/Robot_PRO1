Name of the prioject: ELECTION POLL
Project Overview: This program facilitates users to vote from anywhere. If this mobile voting sysytem is inculcated, it exhuberently increases the voting percentage of the nation with its easy access and use.

<!-- A list of files included:                
                -config
                    -config.js [To set up the database connection]
                -model
                    -Consists of the database structures               s               
                -views
                    -Consists of the webpage designs
                -app.js [Executable Program]
                -README.md [Information file] -->

Steps to insatll:
1.  Start the mongo Db
~~~ 
            ./mongod
~~~

2.  Install node modules
~~~
            npm i
~~~

3.  Open app.js file and execute
~~~
            node app.js
~~~

4.  Type the url with respective port number
~~~
            localhost:<portnumer>/api
            localhost:4003/api
~~~

5.  The login page consists of 3 functionalities

        i) REGISTER:
                Register by filling up the fields
        ii) LOGIN:
                Registered Users can Login by typing the credentials
        iii)CHART:
                 Displays the chart based on the current vote status- Back button from the charts loads the home page

6.  After successful login, select the the candidate you wish to vote. Press 'Submit and Login'            Button which renders back the HomePage.