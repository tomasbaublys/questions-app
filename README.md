# Questions App

Full‑stack web application built with React (client) and Node.js + Express (server). Users can submit a question via a simple responsive UI, the backend returns an answer, and recent questions are stored in PostgreSQL (optional).

---

## Overview

The client communicates only with the backend API.

Backend responsibilities:

- Validates incoming questions
- Returns an answer to the client
- (Optional) Persists questions + answers into PostgreSQL and exposes history endpoints

---

## Features

### Client

- Submit a question
- Shows the latest (current) question + answer
- Shows previous questions (expand/collapse)
- Light/Dark theme toggle (persisted in localStorage)

### Server

- REST API for asking a question and fetching history
- Security headers via Helmet
- Input validation (required + max length)

---

## Requirements

- Node.js
- npm
- (Optional) Docker + Docker Compose (for PostgreSQL)

---

## Installation

### 1) Server

```bash
cd server
npm install
npm run dev
```

Server runs on:

```
http://localhost:5501
```

### 2) Client

```bash
cd client
npm install
npm run dev
```

Client runs on:

```
http://localhost:5173
```

---

## Environment Variables

Example template is provided as `server/.env.example`.

If `DATABASE_URL` is not set or PostgreSQL is not reachable, the API still answers questions, but history endpoints return an empty list.

---

## PostgreSQL (Optional)

From repo root:

```bash
docker compose up -d
```

Stop:

```bash
docker compose stop
```

Remove containers:

```bash
docker compose down
```

Remove containers + DB data:

```bash
docker compose down -v
```

---

## Tech Stack

Client:

- React
- TypeScript
- Styled Components
- MUI Icons

Server:

- Node.js
- Express
- PostgreSQL (`pg`)
- Helmet

---

## Project Structure

```text
Questions_app/
├── client/
│   └── src/
│       ├── components/
│       │   ├── pages/
│       │   └── UI/
│       │       ├── atoms/
│       │       ├── molecules/
│       │       └── organisms/
│       ├── contexts/
│       └── types.ts
│
├── server/
│   └── src/
│       ├── controllers/
│       ├── db/
│       ├── routes/
│       └── index.js
│
└── docker-compose.yml
```

---