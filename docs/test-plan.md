# Test Plan – QA Demo App

## 1. Objective

This document outlines the testing strategy for a simple web application built as part of a QA Automation Challenge. The goal is to verify that login and CRUD functionalities work as expected, and to demonstrate UI and API test automation skills.

---

## 2. Scope of Testing

- Functional testing of login and notes CRUD
- UI automation using **Cypress**
- API automation using **Supertest + Jest**
- Positive and negative test cases

---

## 3. Tools Used

| Type          | Tool        | Reason                                      |
|---------------|-------------|---------------------------------------------|
| UI Automation | Cypress     | Easy setup, readable syntax, visual output |
| API Testing   | Supertest   | Simple integration with Jest & Express     |
| Unit Testing  | Jest        | Lightweight, fast test runner               |
| HTTP Client   | Axios       | Standard client for frontend requests       |
| Styling       | TailwindCSS | Utility-first, fast prototyping             |

---

## 4. Test Environment

| Component | Setup                          |
|-----------|--------------------------------|
| Backend   | Node.js + Express + MongoDB    |
| Frontend  | React + Vite                   |
| Database  | MongoDB (local)                |

---

## 5. Test Scenarios (UI - Cypress)

| Scenario                          | Status |
|----------------------------------|--------|
| Login with valid credentials     |    +   |
| Login with invalid credentials   |    +   |
| Create a new note                |    +   |
| Edit an existing note            |    +   |
| Delete a note                    |    +   |
| Logout                           |    +   |
| Assert note content after action |    +   |

---

## 6. Test Scenarios (API - Supertest)

| Endpoint             | Case                      | Status |
|----------------------|---------------------------|--------|
| POST /api/users/login| Valid & Invalid Login     |    +   |
| GET /api/notes       | Authorized & Unauthorized |    +   |
| POST /api/notes      | Valid & Invalid data      |    +   |
| PUT /api/notes/:id   | Valid ID / Invalid ID     |    +   |
| DELETE /api/notes/:id| Authorized / Unauthorized |    +   |


