const debug = require('debug')('cabi-cache:example')
const getStationInfo = require('./request.js')
// Mock server, simiulates GBFS reply
// allows changing ttl to speed up debugging
// allows offline use
function mockserver () {
  //console.log('mock', Date.now())
  return new Promise(function(resolve, reject){
    setTimeout(()=>{
      let time = Date.now()
      resolve({ ttl:60, last_updated: posixTime(), data: 'DAT DATA' })
    }, 200)
  })
}

function useApp() {
  getStationInfo().then(debug).then((res)=>{
    debug(res.headers.get('content-type'))
  })
}

useApp()
setTimeout(useApp, 100) // want this to hit with promise instead of two requests
setTimeout(useApp, 2000)
setTimeout(useApp, 3100)
setTimeout(useApp, 3500)
setTimeout(useApp, 65*1000) // wait longer than server 1 min ttl
