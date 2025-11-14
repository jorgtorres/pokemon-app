# Task API with Express and SQLite

This small Node.js project exposes a Task CRUD API backed by SQLite.

Endpoints (mounted under `/task`):

- POST /task — create task
- PUT /task/:id — update task
- DELETE /task/:id — delete task
- GET /task — list tasks (optional query `user_id`)
- GET /task/:id — get single task

Data model:

- User: id, name, email
- Task: id, title, description, status, due_date, user_id (FK -> User.id)

Run locally:

1. Install dependencies

```bash
npm install
```

2. Start server

```bash
npm start
```

Server will run on http://localhost:3000 by default. The SQLite database file will be created at `data.sqlite` in the project root.

Notes:
- The implementation uses `sqlite3` and the built-in callback API wrapped in Promises.
- Basic validation ensures `title` is provided and that `user_id` references an existing user if supplied.
