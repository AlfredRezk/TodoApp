


# Todo API

> Backend API for Todo application

## Usage

Rename ".env.env" to ".env" and update the values/settings to your own

## Install Dependencies

```
npm install
```

## Run App

```
# Run in dev mode
npm run dev

# Run in prod mode
npm start
```


# Todo Backend API Specifications

Create the backend for a Todo application. The frontend/UI will be created using ReactJs.  
All of the functionality below needs to be fully implemented in this project.


### Category
- List all Categories 
- * Pagination, filtering, etc
- Get single Category
- Create new Category
  * Authenticated users only
  * Must have the role "admin"
  * Only admin can create a Category
- Update Category
- Delete Category

  ### Todo
- List all Todoa
- * Pagination, filtering, etc
- Get single Todo
- Create new Todo
  * Authenticated users only
  * Must have the role "admin"
  * Only admin can create a Category
- Update Todo
- Delete Todo

  ### User
- List all Userd (Admin)
- * Pagination, filtering, etc
- Get single User
- Create new User
- Update User
- Delete User

### Users & Authentication
- Authentication will be done using JWT/cookies
  * JWT and cookie should expire in 30 days
- User Registration
  * Register as a "user" or "admin"
  * Email verification will be sent to the user to verify his/her email
  * Once registered, a token will be sent along with a cookie (token = xxx)
  * Passwords must be hashed
- User login
  * User can log in with email and password
  * Plain text password will compare with stored hashed password
  * Once logged in, a token will be sent along with a cookie (token = xxx)
- User logout
  * Cookie will be sent to set token = none
- Get user
  * Route to get the currently logged-in user (via token)
- Password reset (lost password)
  * User can request to reset password
  * A hashed token will be emailed to the user's registered email address
  * A put request can be made to the generated URL to reset the password
  * The token will expire after 10 minutes
- Update user info
  * Authenticated user only
  * Separate route to update password
- User CRUD
  * Admin only
- Users can only be made admin by updating the database field manually

## Security
- Encrypt passwords and reset tokens
- Prevent NoSQL injections
- Add headers for security (helmet)
- Prevent cross-site scripting - XSS
- Add a rate limit for requests of 100 requests per 10 minutes
- Protect against http param pollution
- Use cors to make API public (for now)

## Documentation
- Use Swagger-autogen and redoc to create documentation
- Use swagger-ui-express to serve swagger-autogen json file
- Documentations  at /api/documents


## Code Related Suggestions
- NPM scripts for dev and production env
- Config file for important constants
- Use controller methods with documented descriptions/routes
- Error handling middleware
- Authentication middleware for protecting routes and setting user roles
- Validation using Mongoose and no external libraries
- Use async/await (use express-async-errors to clean up controller methods)
