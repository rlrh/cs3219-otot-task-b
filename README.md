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
- Run tests locally: `npm run test`
- Setup Travis CI with included `.travis.yml` file by following instructions [here](https://docs.travis-ci.com/user/tutorial/#to-get-started-with-travis-ci-using-github)

#### 5. Build:
- Both frontend and backend: `npm run heroku-postbuild`
- Run built: `npm run start`
- Backend only: `npm run build`
- Frontend only: `cd frontend && npm run build`

#### 6. Deploy:
- Create an app on Heroku Dashboard and connect it to your GitHub repo by following instructions [here](https://devcenter.heroku.com/articles/github-integration)
- Setup CI/CD workflow by enabling `Automatic Deploys from GitHub` and `Wait for CI to pass before deploy`, i
