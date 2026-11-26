# Downbot

Downbot is an authentication-only starting point for an AI chat application.
The backend is an Express/MongoDB API, and the React frontend uses a Vite
development proxy so API calls and the refresh-token cookie stay same-origin
during development.

## Run locally

1. Install Node.js 20+ and MongoDB.
2. In `backend`, copy `.env.example` to `.env` and set your MongoDB URI and
   two independent, random token secrets (at least 32 characters each).
3. Install and start the backend:

   ```sh
   cd backend
   npm install
   npm run dev
   ```

4. In another terminal, install and start the frontend:

   ```sh
   cd frontend
   npm install
   npm run dev
   ```

Open the Vite URL printed in the terminal. The frontend proxies `/api` to
`http://localhost:5000`; no CORS configuration is needed.

## Authentication API

All endpoints are under `/api/v1/auth`. Success responses use
`{ "success": true, "message": "...", "data": {} }`. Errors use
`{ "success": false, "message": "...", "errors": [] }`. The refresh token is
an httpOnly cookie; the access token is returned in `data.accessToken`.

### Register — `POST /register`

```json
{ "name": "Alex Morgan", "email": "alex@example.com", "password": "securepass123" }
```

Returns `201` with `{ "user": { "id": "...", "name": "...", "email": "..." }, "accessToken": "..." }`.

### Login — `POST /login`

```json
{ "email": "alex@example.com", "password": "securepass123" }
```

Returns `200` with the same `user` and `accessToken` data as register.

### Refresh — `POST /refresh`

Request: `{}` and the httpOnly refresh cookie. Returns the standard success
envelope with a rotated `accessToken` and `user`, and rotates the cookie.

### Logout — `POST /logout`

Request: `{}` and the refresh cookie, if present. The cookie is cleared and the
matching stored refresh token is invalidated. Returns
`{ "success": true, "message": "Logged out", "data": {} }`.

### Current user — `GET /me`

Request header: `Authorization: Bearer <accessToken>`. Returns
`{ "success": true, "message": "Profile loaded", "data": { "user": { "id": "...", "name": "...", "email": "..." } } }`.

## Frontend structure

Authentication is organized by feature under `frontend/src/features/auth`:
`api` (Axios), `state` (Redux Toolkit), `hooks` (dispatch and API workflows),
and `ui` (pages and components).
