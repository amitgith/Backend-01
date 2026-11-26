# Downbot authentication API

## Setup

Use Node.js 20+ and MongoDB. Copy `.env.example` to `.env`, set
`MONGODB_URI`, and provide two different random token secrets of at least 32
characters. Then run:

```sh
npm install
npm run dev
```

The API listens on port `5000` by default. The Vite frontend proxies `/api` to
this server, so the development setup does not require CORS.

## Endpoints

All routes are prefixed with `/api/v1/auth`. Success responses are
`{ "success": true, "message": "...", "data": ... }`; failures are
`{ "success": false, "message": "...", "errors": [] }`. Validation errors put
`{ "field": "...", "message": "..." }` entries in `errors`.

### `POST /register`

Request:

```json
{ "name": "Alex Morgan", "email": "alex@example.com", "password": "securepass123" }
```

Response (`201`; refresh token is an httpOnly cookie):

```json
{
  "success": true,
  "message": "Account created",
  "data": {
    "user": { "id": "65a000000000000000000001", "name": "Alex Morgan", "email": "alex@example.com" },
    "accessToken": "<access-token>"
  }
}
```

### `POST /login`

Request:

```json
{ "email": "alex@example.com", "password": "securepass123" }
```

Response (`200`; refresh token is an httpOnly cookie):

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { "id": "65a000000000000000000001", "name": "Alex Morgan", "email": "alex@example.com" },
    "accessToken": "<access-token>"
  }
}
```

### `POST /refresh`

Request: empty JSON object `{}` and the refresh cookie from login/register.

Response (`200`; refresh cookie is rotated):

```json
{
  "success": true,
  "message": "Session refreshed",
  "data": {
    "user": { "id": "65a000000000000000000001", "name": "Alex Morgan", "email": "alex@example.com" },
    "accessToken": "<new-access-token>"
  }
}
```

### `POST /logout`

Request: empty JSON object `{}` and the refresh cookie, if present.

Response (`200`):

```json
{ "success": true, "message": "Logged out", "data": {} }
```

### `GET /me`

Request header: `Authorization: Bearer <access-token>`.

Response (`200`):

```json
{
  "success": true,
  "message": "Profile loaded",
  "data": {
    "user": { "id": "65a000000000000000000001", "name": "Alex Morgan", "email": "alex@example.com" }
  }
}
```
