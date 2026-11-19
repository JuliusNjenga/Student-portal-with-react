# FULL-STACK STUDENT PORTAL

A web application used to manage student records, authentication and fees tracking.

## FEATURES

### Back-end features

* Existing users can login with data that is stored in database only.
* Passwords are hashed using bcrypt to protect user and their privacy.
* Compared hashed password using bcrypt.compare.
* Using parameterized queries to prevent SQL injection.
* Relational schema with ON DELETE CASCADE.
* Able to register new student and add to Database.
* Fetches authenticated student details via RESTful APIs.
* A JWT token is generated and expires in 1 hour.

### Front-end features

* Courses that are in database are fetched and mapped to the front-end.
* Protected route to prevent users from navigating to other pages with no validation.
* JWT to identify existing users stored in local storage.
* Neumorphism effect on the UI.

## Tech stack

* Node.js and Express.js for the backend.
* PostgreSQL for the database to store data.
* React.js and CSS for the front end.
