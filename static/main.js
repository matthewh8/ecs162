export function getFormattedDate() {
  const today = new Date();
  
  const options = { 
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return today.toLocaleDateString('en-US', options);
}

export async function fetchApiKey(){ // utilizes Flask backend to fetch api key from .env file
    try{
    // still needs to be converted to json even though it was transferred initially as json
    const response = await fetch('/api/key'); 
    const data = await response.json();
    return data.apiKey;
    } catch {

    }
}

export async function fetchArticles(){ // queries NYT API for 42 articles, then calls display function
    const apiKey = await fetchApiKey();
    let page = 0;
    const query = 'sacramento';
    let articles = [];
    while(articles.length < 42){
      const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&page=${page}&api-key=${apiKey}`;
      console.log(url);
      const response = await fetch(url);
      const data = await response.json();
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
    displayArticles(articles.slice(0, 42));
    return articles.slice(0, 42);
}

export function displayArticles(articles){ // displays articles by putting them into html
  const leftColumn = document.querySelector('.left-column');
  const mainColumn = document.querySelector('.main-column');
  const rightColumn = document.querySelector('.right-column');
  const columns = [leftColumn, mainColumn, rightColumn];
  for(let i = 0; i < 42; i++){
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

window.onload = function() {
    const currentDateElement = document.getElementById('current-date');
    if (currentDateElement) {
      currentDateElement.textContent = getFormattedDate();
    }
    if (require.main === module){
      fetchArticles();
    }
    
  };