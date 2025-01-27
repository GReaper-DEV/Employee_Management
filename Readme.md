# Employee Management Application

A full-stack application for managing employees.

## Technologies Used

### Backend
- **Node.js**
- **Express.js**
- **Sequelize ORM**

### Frontend
- **Angular 19**
- **Angular Material**

---

## Getting Started

### Prerequisites
1. Ensure you have **Node.js**, **npm**, and **Angular CLI** installed.
2. Set up a **MySQL database** (or the database of your choice) and have the connection details ready.

Clone this repository:

```bash
git clone https://github.com/GReaper-DEV/Employee_Management.git
cd your-repo-folder
```

Install dependencies for both backend and frontend:
```bash
cd backend
npm install
```

```bash
cd frontend
npm install
```

Configure environment variables:

- Rename **.env.example** in the backend folder to **.env** and fill in your database credentials.


## Database Setup
1. Run database migrations to create the necessary tables.
Make sure you are in the **backend** folder.

```bash
npx sequelize-cli db:migrate
```

2. (Optional) Seed the database with dummy data:
```bash
npx sequelize-cli db:seed:all
```
Run this command multiple times if you'd like more sample employees in the table.



## Running the application

1. Start the **backend** server.
```bash
node server.js
```
By default, the backend runs on http://localhost:3000.

2. If you need to change the CORS origin for API requests, update the corsOptions object in backend/server.js:
```bash
var corsOptions = {
  origin: 'http://localhost:4200', // Update this if needed
  optionsSuccessStatus: 200
};
```

## Frontend
1. Start the frontend application:
```bash
cd frontend
ng serve
```

The Angular app will be available at http://localhost:4200.

2. Ensure the backend server is running and accessible from the frontend to enable API communication.

## Features
- **CRUD Operations:** Create, Read, Update, and Delete Employees.
- **Form Validations:** Frontend forms use Reactive Forms with robust validation.
- **Seed Data:** Quickly populate the database with sample employees for testing.
