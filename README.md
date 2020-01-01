# Pokémon App – README.md

## 🧩 User Story

\*"As a casual Pokémon fan, I want a simple app where I can log in, browse Pokémon, and quickly check their details. I would like to type my username and password, get in, and instantly see a searchable, sortable list of Pokémon with their pictures. The app will rely on the current PokeAPI endpoint to fetch up-to-date pokemon data. When I tap one, I want to see its abilities, moves, and forms without having to visit external sites.

If I already logged in before, I expect the app to remember me so I don’t have to type my credentials again. And if I’m not logged in, I shouldn’t be able to see the Pokémon list at all.

I’d like it to look like the attached figma design, work nicely on my phone, and feel fast."\*

---

# 📱 Pokémon App

A full-stack Pokémon application featuring login, protected routes, Pokémon browsing with search and sorting, and detailed Pokémon information.  
This project uses a **custom backend** that proxies and formats data from **PokeAPI**.

---

## 🚀 Features

### **Frontend**

- **Login screen**

  - Username/password validation (`admin/admin`)
  - Shows validation errors for incorrect credentials
  - Stores login state via localStorage
  - Redirects:
    - Logged-in users → cannot see login page
    - Logged-out users → cannot access main page

- **Main Page**

  - Search bar filtering Pokémon list
  - Paginated results (matches PokeAPI pagination)
  - Sort by **name** or **number**
  - Each Pokémon card shows:
    - Photo
    - Name
    - Number

- **Detail View**

  - Clicking a Pokémon opens a dedicated page with:
    - Abilities
    - Moves
    - Forms

- **Design**
  - UI follows provided **Figma design**
  - Mobile-first, responsive layout
  - SEO-friendly HTML and structure

---

## 🛠 Backend

A node.js backend that requests, formats, and serves Pokémon information from **https://pokeapi.co/**.

### **Endpoints**

#### **POST /login**

- Validates credentials
- Accepts `{ "username": "", "password": "" }`
- Allows only `admin/admin`

#### **GET /pokemons**

- Returns the Pokémon list with the same pagination structure as PokeAPI
- Can optionally support:
  - Sorting
  - Searching

#### **GET /pokemons/:id**

- Returns detailed Pokémon info including:
  - Abilities
  - Moves
  - Forms

### Optional Enhancements

- Additional formatting helpers
- Error-handled API proxying

---

## 🧱 Architecture Notes

- Scalable folder structure prepared for future features
- Reusable components and modular services
- Frontend communicates only with the custom backend (not directly with PokeAPI)

---

## 🤖 GenAI Usage

If GenAI tools were used, document them here:
For this project I used GitHub Copilot:
some of the prompts I used were:

Question: fix unhandled runtime AxiosError
Result: created a new catch method for the base axios fetching function
.catch((error: AxiosError) => {})

Question: when using reach navigate, gatsby do not render login page in private Routes
Result: implemented a useEffect hook for reexecuting the check LoggedIn method anytime the route location renders again
useEffect(() => {
if (!isLoggedIn() && location && location.pathname !== `/app/login`) {
// Use @reach/router's navigate, not Gatsby's, so Router recognizes the change
reachNavigate(`/app/login`);
}
}, [location?.pathname]);

Question: for PokemonDetails component move prevButton and nextButton to the middle of the screen
Result: changed CSS from position: absolute to position: fixed and added top: 50% to keep arrays in the center of the screen

## 🤖 Final GenAI Task

Imagine you’re tasked with generating a Table component for a simple task management system using your preferred language. The system should support the following functionality:
● Create, read, update, and delete tasks (CRUD)
● Each task has a title, description, status, and due_date
● Tasks are associated with a user (assume basic User model exists)

PROMPT:

using express and sqlite in nodejs create a table called task which contains title, description, status and due_date, the table is associated to another table called User where a task is associated to a single user, also create the repository and service, as well as the web api for CRUD operations in the task table, such as insert /task, update /task/{:id}, delete /task/:{id}, and get /task

RESPONSE:

What I added
Files created/updated:

package.json — added start script and dependencies (express, sqlite3).
index.js — Express app, mounts /task routes, bootstraps DB and starts server.
db.js — initializes SQLite (data.sqlite) and creates tables User and Task (Task has foreign key user_id -> User.id).
userRepository.js — minimal user repository (create, getById, getAll).
taskRepository.js — task CRUD methods (create, updateById, deleteById, getAll, getById).
taskService.js — business logic + validation (e.g., ensure user_id exists if provided).
taskRoutes.js — Express router for task CRUD:
POST /task
PUT /task/:id
DELETE /task/:id
GET /task (optional query param user_id)
GET /task/:id
README.md — run instructions and summary

STEPS:
Validated the response of the GenAI tool and "moved" forward with approving each iteration of the solution such as

1. I'll apply changes: update package.json, create index.js, and add DB, repositories, services, routes, and README files. This will add the Express + SQLite implementation and wiring for task CRUD.
2. 'll apply changes: update package.json, create index.js, and add DB, repositories, services, routes, and README files. This will add the Express + SQLite implementation and wiring for task CRUD.
3. I'll add the DB module, repositories (user + task), service, routes, and a README. I'll apply a patch that creates these new files.
4. I'll install dependencies, start the server in the background, then run a quick GET to / to verify it's up. Expected outcome: dependencies installed, server starts and returns health status from GET /.
5. Done — I implemented an Express + SQLite Task API and wired repository/service layers, created the DB schema, and started the server to verify it runs.

Edge Cases:

1. title is required for create; attempts to create without it return a 400 error.
2. If user_id is provided it must reference an existing User, otherwise returns 400.
3. Deleting a user (if done directly) will cascade delete tasks (ON DELETE CASCADE).
4. Date fields are stored as text (ISO strings are expected).
5. Basic error mapping: service throws objects like {status, message} that routes use to set HTTP status.

Idiomatic Performance:

1. Example usage (curl)
   Create a task (no user):
   curl -X POST http://localhost:3000/task \
    -H "Content-Type: application/json" \
    -d '{"title":"Buy groceries","description":"Milk, eggs","status":"pending","due_date":"2025-11-20"}'

2. Create a task associated to a user:
   Note: there is no HTTP endpoint to create users in this change; either create a user directly in SQLite or I can add user endpoints. If you create a user (INSERT into User), you can then pass user_id:
   curl -X POST http://localhost:3000/task \
    -H "Content-Type: application/json" \
    -d '{"title":"Pay bills","description":"Electric", "user_id": 1, "due_date":"2025-11-25"}'

3. Update a task:
   curl -X PUT http://localhost:3000/task/1 \
    -H "Content-Type: application/json" \
    -d '{"title":"Buy groceries and snacks","description":"Milk, eggs, chips","status":"in_progress"}'

4. Delete a task:
   curl -X DELETE http://localhost:3000/task/1

5. List tasks (all):
   curl http://localhost:3000/task

Validations:
PROMPT:
add basic request validation with express-validator

RESULT:
I'll update the todo list, then modify package.json and taskRoutes.js to add express-validator and validation checks; after that I'll install dependencies and restart the server to run validation tests. Expected outcome: new dependency installed, server restarted, and POST/PUT endpoints validate inputs.

Summary of changes

package.json — added dependency: "express-validator".
taskRoutes.js — added validation chains for:
POST /task: title required (non-empty string), description optional, status optional (one of pending,in_progress,done,completed), due_date optional (ISO8601), user_id optional (integer).
PUT /task/:id: id param must be integer; body fields validated similarly.
GET /task: optional query user_id validated as integer.
DELETE /task/:id and GET /task/:id: id param validated as integer.
Validation errors return 400 with errors array from express-validator.
