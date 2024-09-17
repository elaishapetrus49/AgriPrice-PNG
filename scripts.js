// Fetch Commodity Prices using Finnhub API
const commodityUrl = 'https://finnhub.io/api/v1/quote?symbol=COFFEE&token=crj918hr01qo3ctd2bgg';

fetch(commodityUrl, {
    headers: {
        'X-Finnhub-Secret': 'crj918hr01qo3ctd2bgg'
    }
})
    .then(response => response.json())
    .then(data => {
        const coffeePrice = data.c; // Current price
        const cocoaPrice = data.c;  // Replace with actual cocoa symbol from Finnhub
        const teaPrice = data.c;    // Replace with actual tea symbol from Finnhub

        document.getElementById('commodity-info').innerHTML = 
        `Coffee Price: $${coffeePrice}<br>
         Cocoa Price: $${cocoaPrice}<br>
         Tea Price: $${teaPrice}`;

        // Plotting prices on Chart.js
        const ctx = document.getElementById('commodityChart').getContext('2d');
        const commodityChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Coffee', 'Cocoa', 'Tea'],
                datasets: [{
                    label: 'Commodity Prices (USD)',
                    data: [coffeePrice, cocoaPrice, teaPrice],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error fetching commodity prices:', error));

// Weather API
const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=-9.4438&longitude=147.1803&current_weather=true`;

fetch(weatherUrl)
  .then(response => response.json())
  .then(data => {
    const temperature = data.current_weather.temperature;
    const description = data.current_weather.weathercode;

    document.getElementById('weather-info').innerHTML = 
      `Temperature: ${temperature}°C, Weather: Code ${description}`;
  })
  .catch(error => console.error('Error fetching weather data:', error));

// ExchangeRate API Example for Currency Data (free access)
const currencyUrl = 'https://api.exchangerate-api.com/v4/latest/PGK';

fetch(currencyUrl)
  .then(response => response.json())
  .then(data => {
    const usdRate = data.rates.USD;
    const audRate = data.rates.AUD;
    const eurRate = data.rates.EUR;
    const cnyRate = data.rates.CNY;
    const jpyRate = data.rates.JPY;
    const sgdRate = data.rates.SGD;

    document.getElementById('currency-info').innerHTML = 
      `1 PGK = ${usdRate.toFixed(2)} USD<br>
       1 PGK = ${audRate.toFixed(2)} AUD<br>
       1 PGK = ${eurRate.toFixed(2)} EUR<br>
       1 PGK = ${cnyRate.toFixed(2)} CNY<br>
       1 PGK = ${jpyRate.toFixed(2)} JPY<br>
       1 PGK = ${sgdRate.toFixed(2)} SGD`;
  })
  .catch(error => console.error('Error fetching currency rates:', error));



// Fetch Agriculture and Trade News using NewsAPI
//const newsApiKey = '669311282ccd4a34a83b9ff360a20a3a'; // Replace with your NewsAPI key
//onst newsUrl = `https://newsapi.org/v2/everything?q=agriculture&apiKey=${newsApiKey}`;

//fetch(newsUrl)
    //.then(response => response.json())
    //.then(data => {
        //const articles = data.articles;
        //let newsHtml = '';
        //articles.forEach(article => {
            //newsHtml += `
                //<div class="news-article">
                    //<h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                    //<p>${article.description}</p>
                //</div>
           // `;
       // });
        //document.getElementById('news-container').innerHTML = newsHtml;
    //})
   // .catch(error => console.error('Error fetching news data:', error));
