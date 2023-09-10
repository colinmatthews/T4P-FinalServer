# Ecommerce API Documentation

The Ecommerce API is used to manage customers, orders, and order items for an ecommerce platform.Base URL

https://t4p-finalserver-production.up.railway.app

This API requires authentication using an API key. To authenticate, include the API key in the Authorization header using the Bearer 
```makefile
Authorization: Bearer YOUR_API_KEY
```

If you don't include a valid API key, you'll receive a 401 Unauthorized. The default key is ```123ABC```.

## Error Handling

If a request fails, the server will respond with an object containing an error property with a message describing the error. For example:
```json
{
  "error": "Customer not found"
}
```


## /customers

### GET

Description: Retrieve all customers.

Example request: ```GET https://t4p-finalserver-production.up.railway.app/customers```

Example response:
```json
[
  {
    "id": 1,
    "name": "John",
    "email": "john@example.com",
    "address": "123 Main St"
  },
  {
    "id": 2,
    "name": "Jane",
    "email": "jane@example.com",
    "address": "456 Oak Ave"
  }
]
```

### POST

Description: Create a new customer.

Example request: https://t4p-finalserver-production.up.railway.app/customers

Body:
```json
{
  "name": "Bob",
  "email": "bob@example.com",
  "address": "789 Elm St"
}
```

Example response:
```json
{
  "id": 3,
  "name": "Bob",
  "email": "bob@example.com",
  "address": "789 Elm St"
}
```

### PUT

Description: Update an existing customer.

Example request: 
```PUT https://t4p-finalserver-production.up.railway.app/customers/3```

Body:
```json
{
  "name": "Bob Smith",
  "email": "bob.smith@example.com",
  "address": "789 Elm St, Suite 200"
}
```

Example response:

```json
{
  "id": 3,
  "name": "Bob Smith",
  "email": "bob.smith@example.com",
  "address": "789 Elm St, Suite 200"
}
```

### DELETE

Description: Delete an existing customer.

Example request: https://t4p-finalserver-production.up.railway.app/customers/3


```json
{
  "id": 3,
  "name": "Bob Smith",
  "email": "bob.smith@example.com",
  "address": "789 Elm St, Suite 200"
}
```

## /orders

#### GET

Description: Retrieve all orders.

Example request: ```GET https://t4p-finalserver-production.up.railway.app/orders```

Example response
```json
[
  {
    "id": 1,
    "customer_id": 2,
    "order_date": "2023-07-01",
    "total": 200
  },
  {
    "id": 2,
    "customer_id": 1,
    "order_date": "2023-06-29",
    "total": 150
  }
]
```

### POST

Description: Create a new order.

Example request: ```POST https://t4p-finalserver-production.up.railway.app/orders```


Body:
```json
{
  "customer_id": 1,
  "order_date": "2023-07-04",
  "total": 50
}
```

Example response:
```json
{
  "id": 3,
  "customer_id": 1,
  "order_date": "2023-07-04",
  "total": 50
}
```

### Method: PUT

Description: Update an existing order.

Example request: ```PUT https://t4p-finalserver-production.up.railway.app/orders/3```

Body:
```json
{
  "customer_id": 1,
  "order_date": "2023-07-04",
  "total": 75
}
```

Example response:json
```json
{
  "id": 3,
  "customer_id": 1,
  "order_date": "2023-07-04",
  "total": 75
}
```

### Method: DELETE

Description: Delete an existing order.

Example request: ```DELETE https://t4p-finalserver-production.up.railway.app/orders/3```

Example response:
```json
{
  "id": 3,
  "customer_id": 1,
  "order_date": "2023-07-04",
  "total": 75
}
```

## /order_items

### GET

Description: Retrieve all order items.

Example request: ```GET https://t4p-finalserver-production.up.railway.app/order_items```

Example response:
```json
[
  {
    "id": 1,
    "order_id": 1,
    "product_name": "T-shirt",
    "price": 20,
    "quantity": 2
  },
  {
    "id": 2,
    "order_id": 2,
    "product_name": "Shoes",
    "price": 50,
    "quantity": 1
  }
]
```
### POST

Description: Create a new order item.

Example request: ```POST https://t4p-finalserver-production.up.railway.app/order_items```

Body:
```json
{
  "order_id": 1,
  "product_name": "Socks",
  "price": 5,
  "quantity": 4
}
```

Example response:
```json
{
  "id": 3,
  "order_id": 1,
  "product_name": "Socks",
  "price": 5,
  "quantity": 4
}
```

### PUT

Description: Update an existing order item.

Example request: ```PUT https://t4p-finalserver-production.up.railway.app/order_items/3```

Body:
```json
{
  "order_id": 1,
  "product_name": "Socks",
  "price": 5,
  "quantity": 3
}
```

Example response:
```json
{
  "id": 3,
  "order_id": 1,
  "product_name": "Socks",
  "price": 5,
  "quantity": 3
}
```

### DELETE

Description: Delete an existing order item.

Example request: ```DELETE https://t4p-finalserver-production.up.railway.app/order_items/3```

Example response:
```json
{
  "id": 3,
  "order_id": 1,
  "product_name": "Socks",
  "price": 5,
  "quantity": 3
}
```
