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
    // console.log(apiKey);
    // console.log('hi');
    const query = 'davis';
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${apiKey}`;
    const response = await fetch(url);
    data = await response.json();
    console.log(data);
}

window.onload = fetchArticles();