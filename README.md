# aws-serverless-nodejs-newrelic
Centralized logs, traces, and metrics fro. NewRelic

Need to install the New Relic [cli](https://github.com/newrelic/newrelic-lambda-cli)
```
newrelic-lambda integrations install \
  --nr-account-id account-id \
  --nr-api-key newrelic-api-key
```
Deploy the application by doing `sls deploy`

Then, you need to subscribe all the lambdas using the cli
```
newrelic-lambda subscriptions install --function all
```

Then you can invoke the function: `invoke-hello-function.sh`

https://github.com/newrelic/newrelic-lambda-extension/blob/main/examples/sam/node/newrelic-example-node/app.js
