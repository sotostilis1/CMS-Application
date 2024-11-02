CMS Application

This CMS application is a full stack project that allows users with appropriate permissions to create, delete, and edit articles, which are presented on a clean and accessible front end.

Features
•	Article Management: Create, view, update, and delete articles.
•	User Authentication: Restricts access to article management functions based on user roles.
•	Image Upload: Supports adding images to articles.
•	Responsive Front End: Built to be accessible across devices, allowing easy navigation and readability.

Front End Overview
The front end is designed to be user-friendly, with a clean layout and intuitive controls, enabling users to interact with articles easily. Users can navigate between articles, view their content, and access editing functions seamlessly. The interface provides feedback messages, image previews, and clear prompts to guide users through their interactions.
Back End Overview
The back end consists of a REST API that was developed with the purpose of participating in the Cloud Native Summer Challenge by Deloitte. The API allows users to perform CRUD operations on articles and manage images associated with those articles. It’s built with Node.js using Express, MongoDB via Mongoose, and JWT for authentication.

Authentication
In order to have access to all API endpoints, you need to log in as admin in the Authentication endpoint. If you login as a guest or don’t login at all, you only have access to GET /api/articles, GET /api/articles/{id} and GET /api/images/{id}. 
After a successful login, the JWT token is stored in a cookie. You don't need to manually include the token in the request headers.
For security purposes, the API uses bcrypt library for comparing the plain text password the user provided, with the hashed password that exists is the database. 
Because there is not an option of creating new accounts, an admin and a guest account are being provided: 
Admin account:
Username: admin , Password: admin
Guest account:
Username: guest , Password: guest 

Installation 
Follow the steps below to install and set up the project: 
1. Clone the Repository 
First, clone the project repository from GitHub: 
git clone https://github.com/sotostilis1/CMS-Application.git
2. Navigate to the Project Directory 
Move into the backend project subfolder:
cd CMS-Application/server/REST_API_backend
3. Install Dependencies 
Run the following command to install all required dependencies from the package.json file: 
npm install 
4. Configure Environmental Variables 
Create a `.env` file inside /REST_API_backend folder with the following variables: 
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongodb_uri
5. Start the Application 
Now that everything is set up, you can start the development server using this command: 
npm start
6. Repeat step 2, 3 and 5 for the frontend
Move into the backend project subfolder:
cd ../../client/react_frontend
Run the following command to install all required dependencies from the package.json file: 
npm install 
start the application:
npm run dev
Now everything is set up and the application should be running properly.

API Endpoints, Requests and Responses

Authentication

•	POST /api/auth/login
•	Description: Admin and Guest user login.

Request :

1.	Select POST method.
2.	URL: http://localhost:3000/api/auth/login


{
"username":"admin",
"password":"admin"
}

Response:

{
"message": "Login successful",
"role": "admin",
"token": " your_jwt_token"
}

HTTP Status Codes:

•	200 OK: Successful login
•	400 Bad Request: Invalid username or password
•	500 Internal Server Error


Articles

•	POST /api/articles
•	Description: Create a new article.
 
Request :

1.	Select POST method.
2.	URL: http://localhost:3000/api/articles

{
"title":"Weather Forecast",
"content":"The weather is currently sunny ",
"image":"sunny_weather.jpg"
}

Response:

{
"message": "Article with the id {id} added to the database!"
}

HTTP Status Codes:

•	201 Created: Article with the id {id} added to the database!
•	500 Internal Server Error
•	403 Forbidden: Access denied. Admins only


•	GET /api/articles
•	Description: Retrieve a list of all articles.

Request :

1.	Select GET method.

2.	URL: http://localhost:3000/api/articles

Response:

All articles that exist at the database.

HTTP Status Codes:

•	200 OK : Shows all articles
•	500 Internal Server Error
 

• GET /api/articles/{id}
• Description: Retrieve a single article by ID.

Request :

1.	Select GET method.
2.	URL: http://localhost:3000/api/articles/{id}

Response:

Article with the provided id

HTTP Status Codes:

•	200 OK: Shows the article with the provided id
•	404 Not Found: Article not found


•	PUT /api/articles/{id}
•	Description: Update an existing article.

Request :

1.	Select PUT method.
2.	URL: http://localhost:3000/api/articles/{id}


{
"title":"UpdatedArticle",
"content":"UpdatedContent",
"image":"UpdatedImage"
}

Response:

{
"message": "Article with id {id} updated successfully"
}

HTTP Status Codes:

•	200 OK: Article with id {id} updated successfully
•	404 Not Found: Article not found
•	403 Forbidden: Access denied. Admins only
 

• DELETE /api/articles/{id}
• Description: Delete an article by ID.

Request :

1.	Select DELETE method.
2.	URL: http://localhost:3000/api/articles/{id}

Response:

{
"message": "Article with the id {id} deleted from the db"
}

HTTP Status Codes:

•	200 OK: Article with id {id} deleted from the database
•	404 Not Found: cannot find the article
•	403 Forbidden: Access denied. Admins only



Images

•	POST /api/images
•	Description: Upload an image.

Request :

1.	Select POST method.
2.	URL: http://localhost:3000/api/images


{
"image":"greece.jpg"
}

Response:

{
"message": "Image with id {id} added to the database!"
}

HTTP Status Codes:

•	200 OK: Image with id ${newImage.id} added to the database
•	500 Internal Server Error
•	403 Forbidden: Access denied. Admins only



•	GET /api/images/{id}
•	Description: Retrieve an image by ID.

Request :

1.	Select GET method.
2.	URL: http://localhost:3000/api/images/{id}

Response:

Image with the provided id

HTTP Status Codes:

•	200 OK: shows the image with the provided id
•	404 Not Found: Image not found


Database Schema

Database consists of three collections. articles , images and users .

articles :

•	title: String (required)
•	content: String (required)
•	image: String (required
•	id: String(Unique)

images :

•	image: String (required)
•	id: String(Unique)

users :

•	username: String (required)
•	password: String (required)
•	role: String
 
΄id΄ field is automatically generated using the uuid library.
