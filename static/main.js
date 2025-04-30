const today = new Date();

const options = { 
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

const dateString = today.toLocaleDateString('en-US', options);

document.getElementById('current-date').textContent = dateString;

async function fetchApiKey(){
    try{
    // still needs to be converted to json even though it was transferred initially as json
    const response = await fetch('/api/key'); 
    const data = await response.json();
    return data.apiKey;
    } catch {

    }
}

async function fetchArticles(){
    const apiKey = await fetchApiKey();
    let page = 0;
    const query = 'sacramento';
    let articles = [];
    while(articles.length < 6){
      const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&page=${page}&api-key=${apiKey}`;
      console.log(url);
      const response = await fetch(url);
      data = await response.json();
      const returned = data.response.docs;
      for(const doc of returned){
        const keywords = doc.keywords;
        for(const keyword of keywords){
          if(keyword.name.includes('Location') && keyword.value.includes('Sacramento')){
            articles.push(doc);
            break;
          }
        }
      }
      page++;
    }
    displayArticles(articles.slice(0, 6));
}

function displayArticles(articles){
  const leftColumn = document.querySelector('.left-column');
  const mainColumn = document.querySelector('.main-column');
  const rightColumn = document.querySelector('.right-column');
  const columns = [leftColumn, mainColumn, rightColumn];
  for(let i = 0; i < 6; i++){
    let article = articles[i];
    let articleWrapper = document.createElement('article'); //create article element wrapping headline/abstract
    let headline = document.createElement('h2');
    headline.textContent = article.headline.main;
    articleWrapper.appendChild(headline);
    let abstract = document.createElement('p');
    abstract.textContent = article.abstract;
    articleWrapper.appendChild(abstract);
    let img = document.createElement('img');
    img.src = article.multimedia.default.url;
    img.classList.add('article-img');
    articleWrapper.appendChild(img);
    columns[i%3].appendChild(articleWrapper); //append wrapper containing everything to parent element column
  }
}


window.onload = fetchArticles();