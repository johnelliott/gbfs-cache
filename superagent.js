var url = require('url')
var debug = require('debug')('cabi-superagent-cache')
var sa = require('superagent')
var sac = require('superagent-cache')

// set up Urls
var config = {
  protocol: 'https:',
  headers:{}
}
var stationInfoURL = url.format({
  hostname: 'gbfs.capitalbikeshare.com',
  pathname: 'gbfs/en/station_information.json',
  query: {}
})
