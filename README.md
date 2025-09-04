InkFlow

Write, share, and manage your thoughts.

InkFlow is an open-source software designed to help users write, share, and manage their thoughts globally. Contributions are welcome!

Project Structure
Backend (backend/)

Contains all server-side functionalities, built using Node.js and Express.

Database: MongoDB

Collections reference a single _id for relational data:

User.js → Stores all user information (name, email, password, etc.)

Post.js → Stores all post-related information of the user and references the User.js schema using author field.

Authentication & Authorization:

Uses JWT (JSON Web Tokens) for token-based authentication.

Tokens are generated during login using the valid userID.

authMiddleware validates incoming requests using the generated token.

Password Security:

Bcrypt is used to hash passwords (256-bit ASCII encrypted) for secure storage and verification.

APIs:

/api/login → Login a user and generate JWT.

/api/signUp → Register a new user.

/user/post → Create a new post (authenticated).

/user/post → Retrieve all posts (can be authenticated depending on setup).

Frontend (inkflow/)

Contains all client-side UI components and React application.

Built using React.js.

Interfaces with backend APIs to display and manage posts.

Supports creating, viewing, and listing posts with associated user information.

Technologies Used

Node.js (Express Framework)

MongoDB

React.js

JWT for authentication

Bcrypt for password hashing

Axios for client-server communication

How It Works

Users register and login via the frontend.

On login, a JWT token is generated and stored on the client-side.

Authenticated routes (like creating a post) require the JWT token.

Users can create posts, which are stored in the database referencing their userID.

Posts can be fetched and displayed with associated user information.

Getting Started

Clone the repository.

Install dependencies:

npm install


Set up .env with your MongoDB URI and JWT secret.

Run the backend server:

node server.js


Start the React frontend:

npm start
