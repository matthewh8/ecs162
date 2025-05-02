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
let page = 0;

export async function fetchArticles(){ // queries NYT API for 6 articles, then calls display function
    const apiKey = await fetchApiKey();
    const query = 'sacramento'; // we chose just sacramento because davis didn't have anything
    let articles = [];
    while(articles.length < 6){
      const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&page=${page}&api-key=${apiKey}`;
      console.log(url);
      const response = await fetch(url);
      const data = await response.json();
      const returned = data.response.docs;
      for(const doc of returned){
        const keywords = doc.keywords;
        for(const keyword of keywords){
          if(keyword.name.includes('Location') && (keyword.value.includes('Sacramento') || (keyword.value.includes('Davis')))){
            articles.push(doc);
            break;
          }
        }
      }
      page++;
    }
    displayArticles(articles.slice(0, 6));
    return articles.slice(0, 6);
}

export function displayArticles(articles){ // displays articles by putting them into html
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
// enables endless scrolling

const isJest = typeof process !== 'undefined' && process.env.JEST_WORKER_ID !== undefined; // checks if ran by jest or in app
if (!isJest){
  let loading = false;

  const observer = new IntersectionObserver(async (entries) => { // checks intersection of scroll sentinel to determine when to load new pages
    if (loading || !entries[0].isIntersecting) return;
    loading = true;
    const newArticles = await fetchArticles();
    if (newArticles.length > 0) {
      displayArticles(newArticles);
    } else {
      observer.disconnect();
    }
    loading = false;
  }, { threshold: 1.0 });

  observer.observe(document.querySelector('.scroll-sentinel'));
}

window.onload = function() { // on window load, fetch the first batch of articles if not in test mode
    const currentDateElement = document.getElementById('current-date');
    if (currentDateElement) {
      currentDateElement.textContent = getFormattedDate();
    }
    if (!isJest) {
      fetchArticles();
    }
    
  };