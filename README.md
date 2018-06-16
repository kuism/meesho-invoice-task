# meesho-invoice-task
Use this for pushing mesages to queue for invoice MS

curl -X POST \
  https://meesho-task-queue.firebaseio.com/invoice-service/tasks.json \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 811dc1ea-6091-78ad-1df7-0b3f494f486b' \
  -d '{
	"channel":"create-order",
	"order_id": "80"
}'
