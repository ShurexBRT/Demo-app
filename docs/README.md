#QA Demo App – Automation Challenge (React + Node.js)

This is a simple full-stack application created for a QA Automation technical challenge.  
It includes user authentication and note CRUD functionality — built with testability in mind.

---

## Tech Stack

### Frontend
- **React (Vite)**
- **Tailwind CSS**
- **React Router DOM**
- **Axios**

### Backend
- **Node.js / Express**
- **MongoDB** (local)
- **JWT authentication**
- **bcryptjs** for password hashing

### Testing
- **API Tests:** Jest + Supertest
- **UI Tests:** Cypress

---

## Features

### Functionality
- User registration and login with JWT
- Protected dashboard
- Create / Read / Update / Delete (CRUD) notes
- Token stored in `localStorage`
- Axios interceptors for auth headers
- Basic error handling

### Test Coverage
- Login (valid & invalid)
- Create note
- Edit note
- Delete note
- API status/asserts
- Unauthorized access handling
- Full UI flow (Cypress)
- Full API coverage (Supertest)

---

##  Setup Instructions

Total time: 2–3 minutes  
Requires: Node.js, MongoDB (local)

### 1. Backend Setup

In CMD

cd backend
npm install
npm run seed     # Adds a test user to DB
npm start        # Runs backend at http://localhost:5000


### 2. Frontend Setup


In CMD

cd frontend
npm install
npm run dev      # Runs frontend at http://localhost:5173


### Test User 

Email:    testuser@example.com
Password: Test1234

---

### Runing Tests 

1. API Tests (backend)

In CMD

cd backend
npm run test:api


2. UI Tests (Cypress)

In CMD

cd frontend
npx cypress open

