/**
 * Make the following POST request with either axios or node-fetch:

POST url: http://ambush-api.inyourarea.co.uk/ambush/intercept
BODY: {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
}

 *******

The results should have this structure:
{
    "status": 200.0,
    "location": [
      ...
    ],
    "from": "CACHE",
    "content": [
      ...
    ]
}

 ******

 *  With the results from this request, inside "content", count
 *  the number of packages that have a MAJOR semver version 
 *  greater than 10.x.x
 */
const axios = require('axios');
module.exports = async function countMajorVersionsAbove10() {
  const {
    data
  } = await axios.post(`http://ambush-api.inyourarea.co.uk/ambush/intercept`, {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
  })

  const version = "10.0.0"
  const versions = []
  data.content.forEach(content => {
    const currentVersion = content.package.version.split('.')
    const version2 = version.split('.')
    if (parseInt(currentVersion[0], 10) > parseInt(version2[0], 10) || (parseInt(currentVersion[0], 10) == parseInt(version2[0], 10) && (parseInt(currentVersion[1], 10) > parseInt(version2[1], 10) || parseIntt(currentVersion[1], 10) == parseInt(version2[1], 10) && parseInt(currentVersion[2], 10) > parseInt(version2[2], 10)))) {
      versions.push(currentVersion.join())
    }
  })
  return versions.length
};