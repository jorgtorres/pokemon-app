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
