'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT: '"http://192.168.1.95/"'
  API_ROOT: '"/api"',
  // API_ROOT: '"http://192.168.1.229:8080/"',
  UPLOAD_ROOT: '"http://192.168.1.95/api/"'
})
