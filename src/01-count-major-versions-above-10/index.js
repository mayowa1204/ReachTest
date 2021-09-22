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
    if (~~currentVersion[0] > ~~version2[0]) {
      versions.push(currentVersion.join())
    }
    if (~~currentVersion[0] == ~~version2[0] && (~~currentVersion[1] > ~~version2[1] || ~~currentVersion[1] == ~~version2[1] && ~~currentVersion[2] > ~~version2[2])) { // parse int
      versions.push(currentVersion.join()) // joining the array 
    }
  })
  return versions.length
};