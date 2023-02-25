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

