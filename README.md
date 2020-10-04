# CS3219 OTOT Task B
## A0180340U Rayner Lim Ri Han

[![Build Status](https://travis-ci.com/rlrh/cs3219-otot-task-b.svg?branch=master)](https://travis-ci.com/rlrh/cs3219-otot-task-b)

### Basic message board web app built with Express.js for the backend, Vue.js for the frontend, and BootstrapVue for styling

#### Live demo: [`https://cs3219-a0180340u-otot-task-b.herokuapp.com/`](https://cs3219-a0180340u-otot-task-b.herokuapp.com/)

#### API routes:
- `/messages` (GET, POST)
- `/messages/:messageId` (GET, PUT, DELETE)
- `/users` (GET)
- `/users/:userId` (GET)
- `/session` (GET)


#### 1. Setup MongoDB databases for testing and production and copy their URLs into the `.env` file
```
PROD_DATABASE_URL=?
TEST_DATABASE_URL=?
```

#### 2. Install:
```
npm install
cd frontend
npm install
cd ..
```

#### 3. Run:
- Both frontend and backend: `npm run dev`
- Backend only: `npm run backend`  
- Frontend only: `npm run frontend` 
- Backend is at `http://localhost:5000`, frontend is at `http://localhost:8080` by default

#### 4. Test:
`npm run test`

#### 5. Build:
- Both frontend and backend with hot reload: `npm run heroku-postbuild`
- Run built: `npm run start`
- Backend only: `npm run build`
- Frontend only: `cd frontend && npm run build`
