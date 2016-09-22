const debug = require('debug')('cabi-cache:fetch')
var url = require('url')
var fetch = require('isomorphic-fetch')

// set up Urls
// https://gbfs.capitalbikeshare.com/gbfs/en/station_information.json
var config = {
  protocol: 'https:',
  headers:{}
}
var stationStatusURL = url.format({
	hostname: 'gbfs.capitalbikeshare.com',
	pathname: 'gbfs/en/station_status.json',
	query: {}
})
debug('stationStatusURL', stationStatusURL)

module.exports = function getJsonBlob() {
// use some state as a target for merging json
var closestIds = [115, 84, 159, 186]
// Second json fetch is simply nested
return fetch(stationStatusURL, config)
  .then((res)=>res.json())
}
