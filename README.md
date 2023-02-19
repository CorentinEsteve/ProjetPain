# Projet Pain

## Application Routes

### User Routes
- `POST /api/users/signup`: Create a new user
- `POST /api/users/login`: Log in an existing user
- `DELETE /api/users/:id`: Delete an existing user (only for admin users)

Example of request body for creating a user:

`{
    "username" : "TheMagicDragon",
    "password" : "azerty123",
    "firstName" : "François",
    "lastName" : "Pierrenoux",
    "email" : "email.address@email.com"
}`

### Product Routes
- `GET /api/products`: Get all products
- `GET /api/products/:date`: Get all products created after a specific date
- `POST /api/products`: Create a new product
- `DELETE /api/products/:uuid`: Delete an existing product
- `GET /api/products/:id`: Retrieve a specific product
- `PUT /api/products/:id`: Update a specific product
- `DELETE /api/products/:id`: Delete a specific post

Example of request body for creating a post (user needs to be logged in):

`{
    "title": "Hello World!",
    "content": "This is my first blog post!"
}`
