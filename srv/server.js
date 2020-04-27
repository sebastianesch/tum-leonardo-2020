'use strict'

const cds = require('@sap/cds')
const proxy = require('@sap/cds-odata-v2-adapter-proxy')
const log = require('cf-nodejs-logging-support')

cds.on('bootstrap', app => {
    app.use(proxy());
    app.use(log.logNetwork)
})

module.exports = cds.server

log.info('Sever started.')