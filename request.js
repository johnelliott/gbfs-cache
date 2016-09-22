var url = require('url')
var debug = require('debug')('cabi-cache')
var fetch = require('isomorphic-fetch')

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

var cache
function posixTime () {
  return Math.trunc(Date.now().valueOf()/1000)
}

// getter that uses cache
function getStationInfo () {
  debug('getter called')
  if (cache) {
    return cache.then(c=>{
      debug('now', posixTime())
      debug('last_updated', c.last_updated)
      debug('delta', posixTime() - c.last_updated)
      debug('cache hit within ttl?', posixTime() - c.last_updated < c.ttl)
      if(posixTime() - c.last_updated < c.ttl) {
        return c
      }
      debug('making http request')
      //cache the promise of request data
      //debug('what is the cache before making the request?', cache)
      cache = hitServer()
      return cache
    })
  }
  debug('no cache')
  cache = hitServer()
  return cache
}

// make HTTP request to GBFS with isomorphic fetch
function hitServer() {
  debug('using http')
  return fetch(stationInfoURL, config).then(res=>res.json())
  //offline mode
  //return mockserver()
}
module.exports = getStationInfo
