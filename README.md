# Projet Pain

## Application Routes

### User Routes
- `POST /api/users/signup`: Create a new user
- `POST /api/users/login`: Log in an existing user
- `DELETE /api/users/:id`: Delete an existing user (only for admin users)

Example of request body for creating a user:

`{
    "username": "John",
    "password": "CrazyPotatoJohn"
}`

### Post Routes
- `GET /api/posts`: Get all blog posts
- `GET /api/posts/:date`: Get all blog posts created after a specific date
- `POST /api/posts`: Create a new blog post
- `DELETE /api/posts/:uuid`: Delete an existing blog post
- `GET /api/posts/:id`: Retrieve a specific post
- `PUT /api/posts/:id`: Update a specific post (only allowed for the author of the post)
- `DELETE /api/posts/:id`: Delete a specific post (only allowed for the author of the post or users with the admin role)
- `GET /api/posts?from=1674560065`: Retrieve a list of all posts sorted by date, starting from the timestamp provided in the from query parameter

Example of request body for creating a post (user needs to be logged in):

`{
    "title": "Hello World!",
    "content": "This is my first blog post!"
}`
