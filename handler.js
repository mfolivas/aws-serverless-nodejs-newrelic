const newrelic = require('newrelic')

module.exports.hello = async (event) => {
  const startedTime = new Date()
  console.log('Started the invocation of hello')
  await sleep()
  const responseNumber = generateANumberFromOneToFifty()
  
  if (responseNumber > 40) {
    console.error('The response number is greater than forty', responseNumber)
    sendMetrics(responseNumber, startedTime, false)
    throw new Error('The response number is not valid', responseNumber)
  }
  console.log('Valid response number', responseNumber)
  sendMetrics(responseNumber, startedTime, true)
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  }
}

const generateNumber = (min, max) => {
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}

const generateANumberFromOneToFifty = () => {
  return generateNumber(1, 50)
}

const sleep = (ms = generateNumber(1, 4000)) => {
  console.log('Sleeping for a total of', ms, 'milliseconds')
  return new Promise(resolve => setTimeout(resolve, ms))
}

const sendMetrics = (value, startedTime, wasSuccessful = true) => {
  newrelic.recordCustomEvent('response.amount', value, `wasSuccessful:${wasSuccessful}`, `stage:${process.env.stage}`)
  newrelic.recordCustomEvent('response.latency', new Date() - startedTime, `wasSuccessful:${wasSuccessful}`, `stage:${process.env.stage}`)
}