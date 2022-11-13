
let category;
let limit;

function parseJSON(data){

  var entries = data.entries;
  var count = 0;
  const APIs = [];

  entries.forEach(element => {

    if((element.Category === "" || element.Category.toLowerCase() === category.toLowerCase()) && count < limit){
      APIs.push(element.API);
      count = count + 1;
    }
  });

  APIs.sort(function(a, b) {
    if (a.toLowerCase() < b.toLowerCase()) return 1;
    if (a.toLowerCase() > b.toLowerCase()) return -1;
    return 0;
  });

  APIs.forEach(element => {
    console.log(element);
  });

}

function requestJSON(){

  const axios = require('axios')
  
  axios.get('https://api.publicapis.org/entries')
    .then(res => parseJSON(res.data))
    .catch(err => console.log(err))

}

function run(){

  if(process.argv[2] === undefined){
    console.log("Please enter the category");
    return;
  }

  if(process.argv[3] === undefined){
    console.log("Please enter the limit");
    return;
  }

  category = process.argv[2]
  limit = parseInt(process.argv[3])

  if(isNaN(limit)){

    console.log("Please enter a valid limit");
    return;

  }

  requestJSON();

}

run();