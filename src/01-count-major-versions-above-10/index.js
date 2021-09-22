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
    const majorVersion2 = parseInt(version2[0])
    const minorVersion2 = parseInt(version2[1])
    const revisionVersion2 = parseInt(version2[2])
    const majorCurrentVersion = parseInt(currentVersion[0], 10)
    const minorCurrentVersion = parseInt(currentVersion[1], 10)
    const revisionCurrentVersion = parseInt(currentVersion[2])
    if (majorCurrentVersion >= majorVersion2 && minorCurrentVersion >= minorVersion2 && revisionCurrentVersion >= revisionVersion2) {
      versions.push(currentVersion.join())
    }

  })
  return versions.length
};