# InfoPulse

 [![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

InfoPulse is a web application that allows business users such as health professionals to create and share information with their users. It is designed to be a simple and easy to use platform for sharing information, with a focus on privacy and security.

## Description

### Problem it is solving

Providing users with information is an important part of many businesses. 40-80% of information and advice verbally given to users is immediately forgotten. In some fields such as health, this information or advice can be very important.

### How it solves the problem

This application allows business to share information using pre-written factsheets chosen specifically for the user, with custom information being able to be appended, available in a browser through a secure login to the user's dashboard.

Factsheets are created by the business and can be shared with multiple users. They are created, edited and deleted by a logged-in administrator through a business dashboard using markdown, and they can include images and other media via hyperlinks. The factsheets are converted to HTML and stored in a database, and are then retrieved and displayed to the user when they log in.

Users are enrolled in the system by the administrator, and are given a unique passphrase together with their registered email address which they use to log in and create their own username and password for future logging in. The passphrase is used to ensure that only the intended user can log in to the system.

Administrators can also create and edit users, which are other administrators who can log in to the business dashboard and create, edit and delete factsheets.

Images can be uploaded by the administrator and are resized and compressed to reduce bandwidth usage and improve performance. Images are stored in the database and are referenced in the factsheets via a link to the images API endpoint. In the factsheet editing screen, image links are inserted into the markdown when the administrator chooses the image along with the image's CSS class for styling.

## Technologies Used

This is a full-stack application using NodeJS for the server and Express for the web framework. The templating engine is Handlebars, and the database is MySQL. The application is hosted on Heroku, and the database is hosted on JawsDB. The application is styled using TailwindCSS. Various NodeJS packages are used for features such as authentication, file uploads, and sanitising HTML, and these are detailed below.

### NodeJS (npm) Packages

#### Standard Packages for NodeJS Server

- bcrypt: Hash passwords for storage in database
- connect-session-sequelize: Store sessions in database
- dotenv: Load environment variables from .env file
- express: Web framework for NodeJS
- express-session: Handle sessions for users
- handlebars: Templating engine for HTML
- mysql2: MySQL driver for NodeJS
- sequelize: ORM for MySQL
- tailwindcss: CSS framework

#### Packages used for features

- @octokit/rest: GitHub API, used to retrieve emojis
- dompurify: Sanitise HTML to prevent XSS attacks etc
- generate-passphrase: Generate a random passphrase for user authentication
- jsdom: Create a virtual DOM to aid in sanitising HTML with dompurify
- marked: Convert markdown to HTML
- marked-emoji: Convert emojis in markdown to HTML
- multer: Handle file uploads from the user
- sharp: Resize images and obtain metadata
- 

#### Packages used for formatting and linting

- eslint: Linting for JavaScript
- prettier: Formatting for JavaScript

## Thanks

[404 Image by storyset on Freepik](href="https://www.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_7906233.htm#query=404&position=18&from_view=keyword&track=sph")
