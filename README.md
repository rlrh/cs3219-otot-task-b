# CS3219 OTOT Task B
## A0180340U Rayner Lim Ri Han

[![Build Status](https://travis-ci.com/rlrh/cs3219-otot-task-b.svg?branch=master)](https://travis-ci.com/rlrh/cs3219-otot-task-b)

### Basic message board web app built with Express.js for the backend, Vue.js for the frontend, and BootstrapVue for styling

#### Live demo: [`https://cs3219-a0180340u-otot-task-b.herokuapp.com/`](https://cs3219-a0180340u-otot-task-b.herokuapp.com/)

#### Live API server deployed on AWS Lambda with Serverless framework: 
[`https://yrtw21jxmg.execute-api.us-east-1.amazonaws.com/master`](https://yrtw21jxmg.execute-api.us-east-1.amazonaws.com/master)
##### API routes:
- `/messages` (GET, POST)
- `/messages/:messageId` (GET, PUT, DELETE)
- `/users` (GET)
- `/users/:userId` (GET)
- `/session` (GET)


#### 1. Configure:
Setup MongoDB databases for testing and production and copy their URLs into the `.env` file:
```
PROD_DATABASE_URL=<your_mongodb_production_database_url>
TEST_DATABASE_URL=<your_mongodb_test_database_url>
```

#### 2. Install:
```
npm install
cd frontend
npm install
cd ..
```

#### 3. Run:
```
npm run dev
```
- Backend is at `http://localhost:5000`, frontend is at `http://localhost:8080` by default
- Backend only: `npm run backend`  
- Frontend only: `npm run frontend` 


#### 4. Test:
```
npm run test
```

#### 5. Build:
```
npm run heroku-postbuild
npm run start
```
Live app is at `http://localhost:5000`

#### 6. Deploy:
For serverless deployment:
1. Fork this repo.
2. Setup MongoDB production and test databases according to part 1 above (if you have not).
3. Create [Travis CI](https://docs.travis-ci.com/user/tutorial/#to-get-started-with-travis-ci-using-github) and [AWS](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/) accounts.
4. In AWS, take note of your credentials.
5. In Travis CI, select your repo, click `Settings`, scroll down to the `Environment Variables` section, and add two variables:
```
Name: AWS_ACCESS_KEY_ID, Value: Access Key Id of the IAM user
Name: AWS_SECRET_ACCESS_KEY, Value: Secret Access Key of the IAM user
```
6. Create a pull request in GitHub, or trigger a build in Travis CI.
7. In Travis CI, select your repo, and in the job log look for the URL of the deployed endpoint:
```
...
endpoints:
  ANY - https://yrtw21jxmg.execute-api.us-east-1.amazonaws.com/master/
  ANY - https://yrtw21jxmg.execute-api.us-east-1.amazonaws.com/master/{proxy+}
...
```
8. Copy the URL without the trailing slash into `frontend/vue.config.js` `devServer.proxy.target`:
```
...
    devServer: {
        proxy: {
            '^/': {
              target: 'https://yrtw21jxmg.execute-api.us-east-1.amazonaws.com/master',
              changeOrigin: true
            }
        }
    }
...
```
9. Run the frontend locally: `npm run frontend` and go to `http://localhost:8080`

For Heroku deployment:
- Create an app on Heroku Dashboard and connect it to your GitHub repo by following instructions [here](https://devcenter.heroku.com/articles/github-integration)
- Setup Travis CI with included `.travis.yml` file by following instructions [here](https://docs.travis-ci.com/user/tutorial/#to-get-started-with-travis-ci-using-github)
- Setup CI/CD workflow by enabling `Automatic Deploys from GitHub` and `Wait for CI to pass before deploy`
