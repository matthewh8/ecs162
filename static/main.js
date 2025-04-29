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
    console.log(apiKey);
    console.log('hi');
    const query = 'davis';
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${apiKey}`;
    const response = await fetch(url);
    data = await response.json();
    console.log(data);
    articles = data.response.docs;
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
    columns[i%3].appendChild(articleWrapper); //append wrapper containing everything to parent element column
  }
}


window.onload = fetchArticles();