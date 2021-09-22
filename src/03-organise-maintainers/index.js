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

 * With the results from this request, inside "content", 
 * list every maintainer and each package name that they maintain,
 * return an array with the following shape:
[
    ...
    {
        username: "a-username",
        packageNames: ["a-package-name", "another-package"]
    }34
    ...
]
 * NOTE: the parent array and each "packageNames" array should 
 * be in alphabetical order.
 */
const axios = require('axios');
module.exports = async function organiseMaintainers() {
  const{data} = await axios.post(`http://ambush-api.inyourarea.co.uk/ambush/intercept`,
  { "url": "https://api.npms.io/v2/search/suggestions?q=react",
  "method": "GET",
  "return_payload": true 
  })
 const maintainerList = []
  data.content.forEach(content=>{
  content.package.maintainers.forEach(maintainer=>{
    const index = maintainerList.findIndex(x => x.username === maintainer.username);
    console.log(index)
    if(index < 0){
      maintainerList.push({username:maintainer.username, packageNames:[content.package.name]})
   }
    else {
      const  newPackage =  maintainerList[index].packageNames.map(p=>{
        return p
      })
       newPackage.push(content.package.name)
       maintainerList[index].packageNames =newPackage.sort()
    }
 
  })
})
return maintainerList.sort(function(a,b){
  if(a.username < b.username) { return -1; }
  if(a.username > b.username) { return 1; }
  return 0;
},)
};
