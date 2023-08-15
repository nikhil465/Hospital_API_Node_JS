# Hospital API

The Hospital API is a backend system built using Express.js, MongoDB, and Passport for authentication. It provides endpoints for doctors, patients, and medical reports management. This API allows doctors to register, login, and create medical reports for patients. Patients can register, view their reports, and filter reports by status.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
  - [Doctor](#doctor)
  - [Patient](#patient)
  - [Reports](#reports)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Environment Configuration](#environment-configuration)
- [Database](#database)
- [Logging](#logging)

## Prerequisites

Before running the Hospital API, make sure you have the following software installed:

- Node.js
- MongoDB

## Getting Started

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd <project-directory>`
3. Install dependencies: `npm install`
4. Start the server: `npm start`

## API Endpoints

### Doctor

- `POST /api/v1/doctor/register`: Register a new doctor.
- `GET /api/v1/doctor/login`: Log in as a doctor.

### Patient

- `POST /api/v1/patient/register`: Register a new patient.
- `POST /api/v1/patient/:id/create-report`: Create a medical report for a patient (authenticated).
- `GET /api/v1/patient/:id/all_reports`: Get all medical reports of a patient (authenticated).

### Reports

- `GET /api/v1/report/:status`: Filter reports by status (authenticated).

## Authentication

The API uses JSON Web Tokens (JWT) for authentication. To access protected routes, include the JWT token in the `Authorization` header with the format: `Bearer <token>`.

## Error Handling

If an error occurs during API requests, the server will respond with appropriate error messages and status codes.

## Environment Configuration

The API can be configured for different environments (development, production) using the `config/environment.js` file. Modify this file to set your environment variables.

## Database

The API uses MongoDB as its database. Database connection configuration is set in `config/mongoose.js`.

## Logging

Access logs are generated using Morgan and stored in the `production_logs` directory. Configuration is specified in `config/environment.js`.

For detailed usage instructions and further customization, refer to the respective code files in the repository.

