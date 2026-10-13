# Blogging Application

A server-rendered blogging application built with Node.js, Express, MongoDB, Mongoose, and EJS. Users can create accounts, sign in, publish blog posts with cover images, and comment on posts.

## Requirements

- Node.js and npm
- A MongoDB database, running locally or hosted (for example, MongoDB Atlas)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root and configure:

   ```dotenv
   MONGO_URL=mongodb://127.0.0.1:27017/blogging-application
   JWT_SECRET=replace-with-a-long-random-secret
   PORT=8000
   ```

   Set `MONGO_URL` to the connection string for your MongoDB database. Choose a strong, private value for `JWT_SECRET`. The `.env` file is ignored by Git; do not commit real credentials or secrets.

3. Start the development server:

   ```bash
   npm run dev
   ```

   Or run without automatic restarts:

   ```bash
   npm start
   ```

4. Open `http://localhost:8000` (or the port configured in `.env`) in your browser.

## Routes

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/` | View the home page and blog posts |
| `GET` | `/user/signup` | Open the sign-up page |
| `POST` | `/user/signup` | Create an account |
| `GET` | `/user/signin` | Open the sign-in page |
| `POST` | `/user/signin` | Sign in |
| `GET` | `/user/logout` | Sign out |
| `GET` | `/blog/add-new` | Open the new-blog page |
| `POST` | `/blog` | Create a blog post with a `coverImage` upload |
| `GET` | `/blog/:id` | View a blog post and its comments |
| `POST` | `/blog/comment/:blogId` | Add a comment to a blog post |

## Project structure

- `app.js` — Express application setup and server entry point
- `config/` — MongoDB connection
- `middleware/` — Request authentication middleware
- `models/` — Mongoose user, blog, and comment models
- `routes/` — User and blog routes
- `services/` — Authentication token helpers
- `views/` — EJS page templates
- `public/` — Static assets and uploaded cover images
