const axios = require("axios");

function filterByPromocao(obj) {
  if (obj.title.includes("promocao")) return true;
}

function filterByInstagram(obj) {
  if (obj.media.includes("instagram_cpc") && obj.likes > 700) return true;
}

function filterByMediaAndMonth(obj) {
  const medias = ["google_cpc", "facebook_cpc", "instagram_cpc"];
  if (medias.some(el => obj.media.includes(el)) && obj.date.includes("/05/"))
    return true;
}

const getPostsPromocao = async () => {
  const response = await axios.get(
    "https://us-central1-psel-clt-ti-junho-2019.cloudfunctions.net/psel_2019_get"
  );
  var filtered = response.data.posts.filter(filterByPromocao);
  return filtered;
};

const getPosts700 = async () => {
  const response = await axios.get(
    "https://us-central1-psel-clt-ti-junho-2019.cloudfunctions.net/psel_2019_get"
  );
  const filtered = await response.data.posts.filter(filterByInstagram);
  return filtered;
};

const getPostsSomatorio = async () => {
  const response = await axios.get(
    "https://us-central1-psel-clt-ti-junho-2019.cloudfunctions.net/psel_2019_get"
  );
  var filtered = response.data.posts.filter(filterByMediaAndMonth);
  return filtered;
};

const getPostsError = async () => {
  const response = await axios.get(
    "https://us-central1-psel-clt-ti-junho-2019.cloudfunctions.net/psel_2019_get_error"
  );
  return response.data.posts;
};

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
  if (a.product_id < b.product_id) {
    return -1;
  }
  if (a.product_id > b.product_id) {
    return 1;
  }
  return 0;
}

const a = async () => {
  const postsPromocao = [];
  const posts = await getPostsPromocao();
  posts.sort(compare);
  let aux = posts[0].product_id;
  posts.map(data => {
    if (data.product_id !== aux) {
      const post = {
        product_id: data.product_id,
        price: data.price
      };
      postsPromocao.push(post);
    }
    aux = data.product_id;
  });
  return postsPromocao;
};

const b = async () => {
  const resposta = [];
  const posts700 = await getPosts700();
  posts700.sort(compare);
  posts700.map(data => {
    let post = {
      product_id: data.product_id,
      price: data.price
    };
    resposta.push(post);
  });
  return resposta;
};

const c = async () => {
  const postsMaio = await getPostsSomatorio();
  let somatorio = 0;
  postsMaio.map(data => {
    somatorio += data.likes;
  });
  return somatorio;
};

const d = async () => {
  const err = await getPostsError();
  err.sort(compareId);
  let teste = err[0];
  let errors = [];
  err.map(data => {
    if (data.product_id === teste.product_id && data.price !== teste.price)
      errors.push(data.product_id);
    teste = data;
  });
  return errors;
};

const all = async () => {
  const promocao = await a();
  const likes = await b();
  const somatorio = await c();
  const erros = await d();
  console.log(promocao, likes, somatorio, erros);
};

all();
