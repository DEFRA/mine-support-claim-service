const joi = require('@hapi/joi')

const queueSchema = joi.object({
  address: joi.string().required(),
  // username: joi.string().required(),
  // password: joi.string().required(),
  sendTimeoutInSeconds: joi.number().optional()
})

const mqSchema = joi.object({
  messageQueue: {
    host: joi.string().default('localhost'),
    hostname: joi.string().default('localhost'),
    port: joi.number().default(5672),
    reconnect_Limit: joi.number().default(10),
    transport: joi.string().default('tcp')
  },
  calculationQueue: queueSchema,
  claimQueue: queueSchema,
  scheduleQueue: queueSchema
})

const mqConfig = {
  messageQueue: {
    host: process.env.MESSAGE_QUEUE_HOST,
    hostname: process.env.MESSAGE_QUEUE_HOST,
    port: process.env.MESSAGE_QUEUE_PORT,
    reconnect_Limit: process.env.MESSAGE_QUEUE_RECONNECT_LIMIT,
    transport: process.env.MESSAGE_QUEUE_TRANSPORT
  },
  calculationQueue: {
    address: process.env.CALCULATION_QUEUE_ADDRESS
    // username: process.env.CALCULATION_QUEUE_USER,
    // password: process.env.CALCULATION_QUEUE_PASSWORD
  },
  scheduleQueue: {
    address: process.env.SCHEDULE_QUEUE_ADDRESS,
    // username: process.env.SCHEDULE_QUEUE_USER,
    // password: process.env.SCHEDULE_QUEUE_PASSWORD,
    sendTimeoutInSeconds: process.env.SEND_TIMEOUT_IN_SECONDS
  },
  claimQueue: {
    address: process.env.CLAIM_QUEUE_ADDRESS
    // username: process.env.CLAIM_QUEUE_USER,
    // password: process.env.CLAIM_QUEUE_PASSWORD
  }
}

const mqResult = mqSchema.validate(mqConfig, {
  abortEarly: false
})

// Throw if config is invalid
if (mqResult.error) {
  throw new Error(`The message queue config is invalid. ${mqResult.error.message}`)
}

const calculationQueue = {
  ...mqResult.value.messageQueue,
  ...mqResult.value.calculationQueue
}
const claimQueue = {
  ...mqResult.value.messageQueue,
  ...mqResult.value.claimQueue
}
const scheduleQueue = {
  ...mqResult.value.messageQueue,
  ...mqResult.value.scheduleQueue
}

module.exports = {
  calculationQueue,
  claimQueue,
  scheduleQueue
}
