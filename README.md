# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

# How to Run the Storefront-Backend
Set up a .env file using the .envTemplate file provided. Note, SALT_ROUNDS should be a number between 1-10.
## Database Setup
- Create a database called **fantasy_worlds** with postgres
- Run **db-migrate up**
- Run **npm run start**

## USEFUL PORTS
- Database is running on - 5432
- Backend is running on - 3000

# How to Use the API
Follow the steps below.
## Step 1
Start By Creating a User - there's much you can do as a user.
### Create a user
POST localhost:3000/users/
```sh
{
    "firstname": "myname",
    "lastname": "mylastname",
    "password": "mypassword"
}
```
Copy the generated Token and input it in Authorization, type - Bearen token.

### To get all users visit the endpoint
Get localhost:3000/users/

### To show a specific user
Get localhost:3000/users/:id - replace :id with a number.


### Forgot your token, vist the auth endpoint and enter the ffg.
POST localhost:3000/users/auth
```sh
{
    "firstname": "myname",
    "password": "mypassword"
}
```
### Update your details. Must be the user with the details. 😌
PUT localhost:3000/users/:id
```sh
{
    "firstname": "yourname",
    "lastname": "yourlastname",
    "password": "mypassword"
}
```
### Delete User - Can only delete yourself 😁
DELETE localhost:3000/users/:id

## Step 2
Navigating the products route.

### To get all products visit the endpoint
Get localhost:3000/products/

### To show a specific product
Get localhost:3000/products/:id - replace :id with a number.


### To create a product
User must be signed in - authorized users only.

POST localhost:3000/products/
```sh
{
    "name": "MacBook Pro 14in",
    "price": 1200000
}
```
### Update your details. Must be authorized. 😌
PUT localhost:3000/products/:id
```sh
{
    "name": "MacBook Pro 14in",
    "price": 1250000
}
```
### Delete Product - must be authorized 😁
DELETE localhost:3000/products/:id


## Step 3
Navigating the orders route. Must be authenticated to perform any action.

### To get all orders for current user visit the endpoint
Get localhost:3000/orders/

### To show a specific order
Get localhost:3000/orders/:id - replace :id with a number.

### To Complete an order
POST localhost:3000/orders/:id - replace :id with a number.

### To create an order
POST localhost:3000/order/

### Delete order
DELETE localhost:3000/orders/:id

## Completed Order
Get localhost:3000/completed_orders