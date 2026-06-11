# KodeCamp 6.0 — Student Enrollment Portal

A React application that demonstrates modern React concepts including component architecture, API data fetching, and controlled/uncontrolled form patterns.

## Tech Stack

- React 18
- Vite
- RandomUser.me API
- CSS3 (Flexbox + Grid)

## Component-Based Architecture & Virtual DOM

**Component-Based Architecture** means breaking down the user interface into small, reusable, independent pieces called components. Each component manages its own logic and rendering. In this app, components like `Header`, `StudentCard`, and `EnrollForm` are built separately and composed together like LEGO blocks. This approach makes code more maintainable, testable, and reusable.

**The Virtual DOM** is React's performance optimization strategy. Instead of directly manipulating the real DOM (which is slow), React creates a lightweight JavaScript copy in memory. When data changes, React compares the new Virtual DOM with the previous one (a process called "diffing"), calculates the minimal changes needed, and efficiently updates only those parts in the real DOM. This makes React apps fast even with frequent updates.

## API Integration

**API Used:** [RandomUser.me](https://randomuser.me/api/?results=6&nat=us,gb)

- Fetches 6 random user profiles from the US and Great Britain
- Free, no authentication required
- Returns data including name, email, avatar, and unique UUID

**Loading & Error Handling:**
- `loading` state shows a loading message while fetching data
- `error` state displays an error message if the API request fails
- The app never crashes — seed data (2 predefined students) is shown as a fallback
- `try/catch/finally` pattern ensures proper state updates regardless of success or failure

## Controlled vs Uncontrolled Forms

This app demonstrates both patterns in the same form:

**Controlled**

 React manages the value via `useState` 
 Updates on every keystroke 
 Use `value` + `onChange` props 
 Real-time validation and preview 

 **Uncontrolled**

 DOM manages the value, React reads via `useRef` 
 Updates only when you ask for the value
 Use `defaultValue` + `ref`  
 Only validated on submit |

**When to use Controlled:**
- Need real-time validation (e.g., show error as user types)
- Want live preview of what the user is entering
- Form fields that affect other parts of the UI

**When to use Uncontrolled:**
- Simple forms where real-time feedback isn't needed
- File input fields (which must be uncontrolled)
- Integrating React with non-React code or libraries

**In this app:**
- Controlled: First name, Last name, Track, Score (show live preview)
- Uncontrolled: Email, Active status (only read on submit)

## Features Implemented

- Fetches 6 random students from an API plus 2 example students = 8 total
- Shows them in nice little cards with avatars, names, scores, and grades (A, B, C, D, or F)
- Lets you filter by track (Frontend, Backend, Mobile, Data)
- Has a form to enroll new students with validation (no empty names, score between 0-100,      email needs @)
- Shows a live preview of what you're typing (proves React is tracking it)
- Has both regular buttons (functional component) and a class button as instructed

**What I Learned**
Building this actually taught me a lot:

- useState and useEffect finally make sense
- Props are just data passed from parent to child (like giving ingredients to a recipe)
- Lifting state up means the parent component holds the data and passes it down
- Keys in lists are super important (React gets confused without them)
- Conditional rendering with ternary operators is cleaner than if/else in JSX
- I used `crypto.randomUUID()` to generate unique IDs for new students. This is a modern JavaScript feature (2021+) that creates guaranteed unique identifiers.


## Author

**Amarachi Onyeke**

Thank you for reading through. I will grealy appreciate feedback.