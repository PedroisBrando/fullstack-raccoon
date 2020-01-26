const axios = require("axios");

function filterByPromocao(obj) {
  if (obj.title.includes("promocao")) return true;
}

function filterByInstagram(obj) {
  if (obj.media.includes("instagram_cpc") && obj.likes > 700) return true;
}

function filterByMediaAndMonth(obj) {
  const medias = ['google_cpc', 'facebook_cpc', 'instagram_cpc'];
  if (medias.some(el => obj.media.includes(el)) && obj.date.includes('/05/')) return true;
}

function getPostsPromocao() {
  return axios
    .get(
      "https://us-central1-psel-clt-ti-junho-2019.cloudfunctions.net/psel_2019_get"
    )
    .then(response => {
      var filtered = response.data.posts.filter(filterByPromocao);
      return filtered;
    });
}

function getPosts700() {
  return axios
    .get(
      "https://us-central1-psel-clt-ti-junho-2019.cloudfunctions.net/psel_2019_get"
    )
    .then(response => {
      var filtered = response.data.posts.filter(filterByInstagram);
      return filtered;
    })
}

function getPostsSomatorio() {
  return axios
    .get(
      "https://us-central1-psel-clt-ti-junho-2019.cloudfunctions.net/psel_2019_get"
    )
    .then(response => {
      var filtered = response.data.posts.filter(filterByMediaAndMonth);
      return filtered;
    })
}

function getPostsError() {
  return axios
    .get(
      "https://us-central1-psel-clt-ti-junho-2019.cloudfunctions.net/psel_2019_get_error"
    ).then(response => {
      return response.data.posts;
    })
}

function compare(a, b) {
  if (a.price < b.price) {
    return -1;
  }
  if (a.price > b.price) {
    return 1;
  }
  if (a.price === b.price) {
    if (a.product_id < b.product_id) {
      return -1;
    }
    if (a.product_id > b.product_id) {
      return 1;
    }
    return 0;
  }
  return 0;
}

function compareId(a, b) {
  if (a.product_id < b.product) {
    return -1;
  }
  if (a.product > b.product) {
    return 1;
  }
  return 0;
}

/*getPostsPromocao().then(res => {
  res.sort(compare);
  let teste = res[0].product_id;
  res.map(data => {
    if (data.product_id !== teste) console.log(data.product_id, data.price);
    teste = data.product_id;
  });
});
*/

/*getPosts700().then(res => {
  res.sort(compare);
  res.map(data => {
    console.log(data.product_id, data.price);
  })
})
*/

/*getPostsSomatorio().then(res => {
  let somatorio = 0;
  res.map(data => {
    console.log(data.media, data.date, data.likes);
    somatorio += data.likes;
  })
  console.log(somatorio);
})
*/

getPostsError().then(res => {
  res.sort(compare);
  let teste = res[0].product_id;
  let erros = [];
  res.map(data => {
    console.log(data.product_id, data.price);
    //if(data.product_id === teste && data.price !== teste.price) erros.push(data);
  })
  console.log(erros);
})
