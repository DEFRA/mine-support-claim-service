const { ServiceBusClient } = require('@azure/service-bus')

class MessageBase {
  constructor (name, config) {
    this.name = name
    this.createClient(config)
  }

  createClient (config) {
    this.sbClient = config.username ? this.createClientFromConnectionString(config) : this.createClientFromAADToken(config)
  }

  createClientFromConnectionString (config) {
    const connectionString = `Endpoint=sb://${config.host}/;SharedAccessKeyName=${config.username};SharedAccessKey=${config.password}`
    return ServiceBusClient.createFromConnectionString(connectionString)
  }

  createClientFromAADToken (config) {
    // TODO add Azure Pod Identity logic
  }

  async closeConnection () {
    await this.sbClient.close()
    console.log(`${this.name} connection closed`)
  }
}

module.exports = MessageBase
