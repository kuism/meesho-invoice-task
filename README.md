# meesho-invoice-task

Get Started
1. Do npm install
2. run the server: npm start
3. run the worker: npm run-script start-worker

it server will run on port- 3001

Use this for pushing messages to queue for invoice MS

curl -X POST \
  https://meesho-task-queue.firebaseio.com/invoice-service/tasks.json \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 811dc1ea-6091-78ad-1df7-0b3f494f486b' \
  -d '{
	"channel":"create-order",
	"order_id": "80"
}'

Sample Order Ids: 41, 42, 43, 44, 45, 46, 80, 81, 83

Project Structure:

bin     - will contain all the executable file
configs - contains all the files config file
db      - Schema of individual collections
models  - contains all the models / classes
routes  - contains the routes or controllers - API definitions


