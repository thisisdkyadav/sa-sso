# Student Affairs Backend

Backend for Student Affairs Hostel Management System

## Single Sign-On (SSO) Implementation

This application implements SSO functionality using JWT tokens to allow authenticated users to seamlessly access other related applications.

### How it works

1. Users authenticate with Google OAuth via express-session
2. Once authenticated, users can navigate to other applications through the landing page
3. When redirecting to another application, a short-lived JWT token is generated and appended to the redirect URL
4. The target application can verify the token using the `/api/verify-token` endpoint

### SSO Endpoints

#### GET /

- If user is not logged in, redirects to `/login`
- If logged in, renders the landing page with redirect options

#### GET /redirect

- Accepts a query parameter `?redirect_to=<target-site-url>`
- Checks for a valid session
- Generates a JWT token and appends it to the redirect URL
- Redirects the user to the target site

#### POST /api/verify-token

- Accepts `{ token }` in the request body
- Verifies the JWT signature and expiration
- Returns `{ success: true, user: { email } }` or `{ success: false, error }`

### JWT Configuration

- Tokens are signed with the secret key from `.env` (`JWT_SECRET`)
- Tokens expire after 5 minutes
- Tokens include the user's email and issuedAt time

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Create a `.env` file with the following variables:

   ```
   PORT=3000
   NODE_ENV=development
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   SESSION_SECRET=your_session_secret
   JWT_SECRET=your_jwt_secret
   ```

3. Start the server:
   ```
   npm start
   ```

## Development

```
npm run dev
```

## Features

- Direct server-side rendering with EJS templates
- Google OAuth authentication
- Session management
- Responsive design

## Technology Stack

- Node.js with Express
- EJS templating engine
- Express Session for session management
- Google OAuth for authentication

## Project Structure

- `index.js` - Main application entry point
- `views/` - EJS templates
- `public/` - Static assets
- `controllers/` - Route controllers
- `routes/` - API routes

## Authentication Flow

1. User clicks on "Sign in with Google" button
2. Google OAuth flow is initiated
3. After successful authentication, user data is stored in session
4. User is redirected to the home page with their profile information
