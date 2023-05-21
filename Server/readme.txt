ConnectDB is used to connect to the Database of the Application. (Contains username and password)

The database is on Heroku 
Heroku Login
Email: ouvatek@gmail.com
Password: OuvatechGIN202320!
FOR MFA contact Johny Eid. 


Under tools, you find  mySQL clearDB access... No UI on heroku for DB... open MYSQL server using the credentials. 

Hotmail Account for Email sending... Needs Unblocking from time to other

Hotmail Login: 
Email: ouvatek@hotmail.com
Password: Ouv@1ekk
IF MFA needed contact Johny Eid

To Run the backend locally, you need to change process.env.* values from index.js file and connectdb.js file to correspond to your database. 
The environment variables are stores in Heroku under settings ==> show config vars. 
PS: Don't forget to 'npm install' the first time.
If help needed in running locally the backend, Contact Johny Eid. 

Countries.js contains a script to fill a table called countries in the database according to our need. Country Name, Accornym, calling code.. etc

Cleaner.js cleans the database according to scripts that run at specific times. 


Nodemailer is used to send emails to users
Bcrypt to encrypt passwords and validate logins. Has a file for it's implementation.
JWTs are to ensure authenticity of users entering different pages. On login, we sign the JWT. On page navigation, we validate the JWT.

Helper.js contains functions that faciliate the process. You can try. They usually don't access the Database. 

Values.json are used in the validation of the measurements. They are static data set in order to validate dynamically the measurements, unify our code, and make it easily updateable. 

The APIs for common use are at the start.
The APIs for patients are under the Patient Information Comment
The APIs for doctors are under the Doctor Information Comment
All the APIs are under index.js


