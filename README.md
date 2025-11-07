# MarketLab

MarketLab is a full-stack stock trading simulation app. It allows users to register, log in, manage virtual funds, buy and sell stocks, and view trading history.

## Features
- User registration and login
- View and manage virtual portfolio
- Buy and sell stocks with simulated funds
- Trading history and order management
- Responsive UI built with React
- RESTful backend APIs (Node.js/Express)
# MarketLab

MarketLab is a full-stack stock trading simulation app. It allows users to register, log in, manage virtual funds, buy and sell stocks, and view trading history through a React frontend and Node.js/Express backends.

This README provides developer-friendly instructions for running the app in development and production, environment variables you need, and troubleshooting tips for cookies/CORS/proxy behavior.

## Repo layout

Top-level folders:

```
MarketLab/
├── stockApp - ui/        # React frontend (development source + build/)
├── stockApp - userRest/  # User REST API (Express)
```

## Quick start (development)

Prereqs: Node.js (v16+), npm

1. Install dependencies

From the repo root run the following for each subproject:

```powershell
cd "stockApp - ui"
npm install

cd "..\stockApp - userRest"
npm install

2. Start servers

Open two terminals (or more) and run the servers you need.

Terminal A — user API (default port 3075):

```powershell
cd "stockApp - userRest"
npm start
```

Terminal B — React dev server (default port 3000):

```powershell
cd "stockApp - ui"
npm start
```

Notes
- During development this project originally used a Create React App proxy (`src/setupProxy.js`) to forward requests like `/login` to the user API. If you removed the proxy, the React dev server will receive relative-path API requests (e.g. `/login`) instead of your backend. You have two common options:
   - Restore `src/setupProxy.js` to keep using relative paths in dev.
   - Use an environment variable (see below) and call the backend by absolute URL in dev.

## Quick start (production)

This repo includes a small production workflow: build the React app and let the user API serve the static files so frontend and API are same-origin.

From the `stockApp - userRest` folder you can run:

```powershell
npm run start:prod
```

This script will: install client deps, run the React build (outputs to `stockApp - ui/build`) and start `server.mjs` in production mode. In production the server serves the static files and API on the same origin (no CORS required).

## Important environment variables

Create `.env` files in each server folder or set env vars in your deployment environment. Required variables (examples):

- For `stockApp - userRest` (server):
   - PORT (optional; defaults to 3075)
   - MONGO_URI (your MongoDB connection string)
   - ACCESS_TOKEN_SECRET
   - REFRESH_TOKEN_SECRET
   - NODE_ENV (set to `production` for serving static build and production cookie behavior)

- For `stockApp - ui` (client):
   - REACT_APP_USER_API (optional in dev; e.g. `http://localhost:3075`)
   - REACT_APP_STOCK_API (if applicable)

Usage notes:
- In development, set `REACT_APP_USER_API=http://localhost:3075` and update frontend fetches to use that base URL (or restore the proxy). When `REACT_APP_USER_API` is present, the client should use `fetch(..., { credentials: 'include' })` so httpOnly cookies (refresh token) are sent/received across origins.
- In production, build-time env vars are baked into the React build. If server serves the frontend, use relative paths and the browser will treat requests as same-origin.

## Cookies, auth and CORS troubleshooting

- Cookies and SameSite:
   - In development you may need `SameSite=None` and `secure=false` so cookies can be set over `http://localhost` during cross-origin dev. In production you should use `SameSite=Lax` (or `Strict`) and `secure=true` so cookies require HTTPS.
   - This project stores the refresh token as an httpOnly cookie; the access token is returned in JSON. The client should store access token in memory and attach it as `Authorization: Bearer <token>` for protected requests.

- CORS:
   - If the frontend calls the backend by absolute URL during dev, the backend must enable CORS for the React origin and allow credentials. `stockApp - userRest/server.mjs` includes a CORS config to allow `http://localhost:3000` and `credentials: true` when not in production.

- Common failure modes when login/logout don't work in dev:
   1. The frontend calls `/login` but the dev proxy was removed — the request hits the React dev server instead of the API. Either restore the proxy or call the backend via `REACT_APP_USER_API`.
 2. Cookies not sent because `credentials` is not set on fetch. Use `credentials: 'include'` when calling a different origin in dev.
 3. Cookies blocked because `secure: true` while using HTTP locally — ensure `secure` is conditional on `NODE_ENV === 'production'`.

## Development tips

- Use `REACT_APP_USER_API` in dev and `credentials: 'include'` during cross-origin requests for reliable cookie behavior.
- To test production behavior locally: build the client (`cd "stockApp - ui" && npm run build`) and start the server with `NODE_ENV=production` so it serves the build from `stockApp - ui/build`.

## Useful scripts

- In `stockApp - userRest/package.json`:
   - `npm run build-client` — installs client deps and builds React app
   - `npm run start:prod` — runs `build-client` then starts the server (serves static files)

## Contributing

Contributions are welcome. Please open an issue for larger changes before sending a pull request.

## License

MIT

## Author

Mike-Mclean
