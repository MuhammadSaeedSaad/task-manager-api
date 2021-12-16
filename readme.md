# Task-manager-api

Task management API is an application where user can create, read, update, and delete tasks. and user can sign up, login, logout, delete account

## routes

### user routers
- **POST */users*** create a user (sign up).
- **POST */users/login*** user login.
- **POST */users/logout*** user logout.
- **POST */user/logoutall*** logout from all sessions (devices).
- **GET */users/me*** view the profile.
- **PATCH */users/me*** edit the profile.
- **DELETE */users/me*** delete the user.
- **POST */users/me/avatar*** upload a profile picture or edit it.
- **GET */users/:id/avatar*** view the profile picture of any user by its id (id: is the user ID).
- **DELETE */users/me/avatar*** delete the profile picture.

### tasks routers
- **POST */tasks*** create a task.
- **GET */tasks*** view all tasks [for the autenticated user].
- **GET */tasks/:id*** view a task given its id.
- **PATCH */tasks/:id*** edit a task given its id.
- **DELETE */tasks/:id*** delete a task given its id.