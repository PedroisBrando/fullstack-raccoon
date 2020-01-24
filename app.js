const axios = require('axios');

function filterByMedia(obj){
  if(obj.title.includes('promocao')) return true
}

function getPosts() {
  return axios.get('https://us-central1-psel-clt-ti-junho-2019.cloudfunctions.net/psel_2019_get')  
    .then(response => {
      var filtered = response.data.posts.filter(filterByMedia);
      return filtered;
    })
}

function teste(){
  const found = posts.find(element => {
    element.media === 'instagram_cpc'
  })
}

getPosts().then(data => {
  console.log(data);
}); 
