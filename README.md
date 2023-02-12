# Storefront Backend

# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

# How to Use the API
Follow the steps below.
## Step 1
In Postman, set the request to **POST**.

Visit the url: **localhost:3000/users/** and create a user

Sample user

{
    "firstname": "myname",
    "lastname": "mylastname",
    "password": "mypassword"
}

Copy the generated Token and input it in Authorization, type - Bearen token.

### To get all users visit the endpoint
Get localhost:3000/users/

### To show a specific user
Get localhost:3000/users/:id - replace :id with a number.


### Forgot your token, vist the auth endpoint and enter the ffg.
POST localhost:3000/users/auth

{
    "firstname": "myname",
    "password": "mypassword"
}

### Update your details. Must be the user with the details. 😌
PUT localhost:3000/users/:id

{
    "firstname": "yourname",
    "lastname": "yourlastname",
    "password": "mypassword"
}

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

{
    "name": "MacBook Pro 14in",
    "price": 1200000
}

### Update your details. Must be authorized. 😌
PUT localhost:3000/products/:id

{
    "name": "MacBook Pro 14in",
    "price": 1250000
}

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

{
    "quantity": 2,
    "productId": "3"
}

### Delete order
DELETE localhost:3000/orders/:id

## Completed Order
Get localhost:3000/orders/completed