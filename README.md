# Express Assignment

This is a simple Node.js project using Express, MongoDB (via Mongoose), and Zod for input validation. The application performs basic CRUD (Create, Read, Update, Delete) operations on a `users` collection.

## Features

- RESTful API using Express
- MongoDB integration using Mongoose
- Input validation using Zod
- Error handling for validation and database operations
- Basic CRUD operations on a `users` collection

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (version 14 or above recommended)
- [MongoDB](https://www.mongodb.com/) (either locally or using [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- [Git](https://git-scm.com/)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/my-express-app.git
cd express-assignment
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project. Add your MongoDB URI in the `.env` file:

```bash
touch .env
```

```plaintext
MONGO_URI=your_mongodb_connection_string_here
```

> **Note:** If you're using MongoDB Atlas, you'll find the connection string in your MongoDB Atlas dashboard. Be sure to replace `your_mongodb_connection_string_here` with your actual connection string.

### 4. Run the Application

You can start the application using the following command:

```bash
npm start
```

The server will be running on `http://localhost:3000`.

## API Endpoints

Here are the available CRUD operations for managing users.

### 1. Create a User

- **Method**: `POST`
- **Endpoint**: `/users`
- **Request Body** (JSON):
  
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
  ```

- **Response**:
  
  - Status 201: Created
  - Status 400: Validation or creation error

### 2. Get All Users

- **Method**: `GET`
- **Endpoint**: `/users`

- **Response**:

  - Status 200: List of users
  - Status 500: Error fetching users

### 3. Get a Single User by ID

- **Method**: `GET`
- **Endpoint**: `/users/:id`

- **Response**:

  - Status 200: User found
  - Status 404: User not found
  - Status 500: Error fetching user

### 4. Update a User by ID

- **Method**: `PUT`
- **Endpoint**: `/users/:id`
- **Request Body** (JSON):
  
  ```json
  {
    "name": "John Doe Updated",
    "email": "john.updated@example.com"
  }
  ```

- **Response**:

  - Status 200: User updated
  - Status 400: Validation or update error
  - Status 404: User not found

### 5. Delete a User by ID

- **Method**: `DELETE`
- **Endpoint**: `/users/:id`

- **Response**:

  - Status 200: User deleted
  - Status 404: User not found
  - Status 500: Error deleting user

## Input Validation

Zod is used to validate incoming data to the API. Each user is required to have:

- `name`: a string (must not be empty)
- `email`: a valid email address

If validation fails, the API will return a `400` status code along with validation errors.

## Error Handling

- **Validation Errors**: If the data provided by the client is invalid, a `400` response with validation error details will be returned.
- **Database Errors**: If something goes wrong with MongoDB, a `500` response will be returned.

## Running in Development Mode

For development, you can use `nodemon` to automatically restart the server when changes are made. First, install `nodemon`:

```bash
npm install --save-dev nodemon
```

Then, update the `scripts` section in `package.json`:

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

Now, run the project in development mode:

```bash
npm run dev
```

## Project Structure

```plaintext
my-express-app/
│
├── models/
│   └── User.js         # User model/schema
├── validators/
│   └── userValidator.js # Zod validation schema
├── .env                # Environment variables
├── .gitignore          # Ignoring node_modules and .env
├── index.js            # Main application file
├── package.json        # Project configuration and dependencies
└── README.md           # Project documentation
```