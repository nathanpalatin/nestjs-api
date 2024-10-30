<div align="center">
  <p align="center">
    <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  </p>
<h1>Awesome NestJS</h1>
<p>A curated list of awesome things related to NestJS</p>



# NestJS API Project

This project is an API developed with NestJS, designed to provide endpoints for account management and user sessions. The project follows **Clean Architecture**, **Domain-Driven Design (DDD)**, and **SOLID principles**, ensuring a modular and maintainable codebase. It includes Docker configuration, authentication endpoints, and a modular architecture.


## Demo

You can try out the API live at [Demo Link](https://nest-api-delicate-cherry-8820.fly.dev).


## Prerequisites

- **Node.js** v16+ and **npm** or **yarn**
- **NestJS CLI** (installed globally with `npm install -g @nestjs/cli`)
- **Docker** for containerization

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/nathanpalatin/nest-api.git
   cd nest-api
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

## Docker Configuration

1. Create a `.env` file based on `.env.example`, adding the necessary environment variables for Docker.

2. Run the command to start the containers:
   ```bash
   docker-compose up -d
   ```

3. Check if the API is running at `http://localhost:3000`.

## Endpoints

Below are the main endpoints of the API.

### POST /accounts

Endpoint to create a new user account.

- **URL**: `/accounts`
- **Method**: POST
- **Request body parameters**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - **201 Created**: Account created successfully.
  - **400 Bad Request**: Invalid or already existing data.

### POST /sessions

Endpoint to create a new authentication session.

- **URL**: `/sessions`
- **Method**: POST
- **Request body parameters**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - **200 OK**: Session created successfully with authentication token.
  - **401 Unauthorized**: Invalid credentials.

## Running Tests

To run the project tests:
```bash
npm run test
```

## License

This project is licensed under the MIT License.

---

### About the Documentation

**API with NestJS**

This documentation describes an API developed in NestJS for managing user accounts and sessions. The API is containerized using Docker, making deployment and scaling easier.

The main endpoints available are:
- **POST /accounts**: Creates a new user account.
- **POST /sessions**: Creates a new authenticated session for the user, returning an authentication token.

Make sure to configure the `.env` file with the necessary variables to connect to the database and define the exposure ports.
