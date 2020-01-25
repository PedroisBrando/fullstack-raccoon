const axios = require("axios");

function filterByPromocao(obj) {
  if (obj.title.includes("promocao")) return true;
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

getPostsPromocao().then(res => {
  res.sort(compare);
  let teste = res[0].product_id;
  res.map(data => {
    if (data.product_id !== teste) console.log(data.product_id, data.price);
    teste = data.product_id;
  });
});
