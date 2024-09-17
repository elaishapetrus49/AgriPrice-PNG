  // JavaScript for Currency Chart
  const ctx = document.getElementById('currencyChart').getContext('2d');

  // Function to extract data from the table
  function getCurrencyData() {
      const table = document.querySelector('.currency-table tbody');
      const rows = table.querySelectorAll('tr');
      let currencies = [];
      let rates = [];

      rows.forEach(row => {
          const cells = row.querySelectorAll('td');
          currencies.push(cells[0].innerText);
          rates.push(parseFloat(cells[1].innerText));
      });

      return { currencies, rates };
  }

  const currencyData = getCurrencyData();

  const currencyChart = new Chart(ctx, {
      type: 'bar', // Bar chart
      data: {
          labels: currencyData.currencies, // Currency names
          datasets: [{
              label: 'Currency Rate (PGK)',
              data: currencyData.rates, // Currency rates
              backgroundColor: [
                  'rgba(0, 93, 0, 0.8)',
                  'rgba(0, 150, 0, 0.8)',
                  'rgba(0, 93, 0, 0.6)',
                  'rgba(0, 150, 0, 0.6)',
                  'rgba(0, 93, 0, 0.4)'
              ],
              borderColor: [
                  'rgba(0, 93, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 93, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 93, 0, 1)'
              ],
              borderWidth: 2
          }]
      },
      options: {
          scales: {
              x: {
                  title: {
                      display: true,
                      text: 'Currency'
                  },
                  grid: {
                      color: '#e0e0e0'
                  }
              },
              y: {
                  title: {
                      display: true,
                      text: 'Exchange Rate (PGK)'
                  },
                  grid: {
                      color: '#e0e0e0'
                  }
              }
          }
      }
  });

  const apiKey = 'CieF5Z5zGp0IHK1Qm9W9Iw==96E5H2vrvongacHT'; // Replace with your actual API key
const apiUrl = `https://api.api-ninjas.com/v1/stockprice?ticker=AAPL`;

fetch(apiUrl, {
method: 'GET',
headers: { 'X-Api-Key': apiKey }
})
.then(response => response.json())
.then(data => {
if (data.length > 0) {
  const commodityPrice = data[0].price;
  const date = new Date().toLocaleDateString();
  
  // Display price and date on the webpage
  document.getElementById('commodity-price').innerText = `Silver Price: $${commodityPrice} per ounce (as of ${date})`;
} else {
  document.getElementById('commodity-price').innerText = 'No data available for Silver.';
}
})
.catch(error => console.error('Error fetching commodity data:', error));

$(document).ready(function() {
    // Commodity Prices Section
    var commodities = [
        'gold', 'silver', 'copper', 'soybean_oil', 'wheat', 'platinum', 'micro_silver', 'lean_hogs',
        'corn', 'oat', 'aluminum', 'soybean_meal', 'soybean', 'lumber', 'live_cattle', 'sugar',
        'natural_gas', 'crude_oil', 'orange_juice', 'coffee', 'cotton', 'micro_gold', 'feeder_cattle',
        'rough_rice', 'palladium', 'cocoa', 'brent_crude_oil', 'gasoline_rbob', 'heating_oil',
        'class_3_milk'
    ]; // Full list of commodities
    var apiKey = 'CieF5Z5zGp0IHK1Qm9W9Iw==96E5H2vrvongacHT'; // Your API key

    function fetchCommodityPrices() {
        var requests = commodities.map(function(commodity) {
            return $.ajax({
                method: 'GET',
                url: 'https://api.api-ninjas.com/v1/commodityprice?name=' + commodity,
                headers: { 'X-Api-Key': apiKey },
                contentType: 'application/json'
            });
        });

        $.when.apply($, requests).done(function() {
            var responses = Array.prototype.slice.call(arguments);
            var prices = [];
            var labels = [];

            responses.forEach(function(response, index) {
                var data = response[0];
                var price = data.price || 'N/A'; // Handle missing price
                var commodity = commodities[index];
                prices.push(price);
                labels.push(commodity.replace('_', ' ').toUpperCase()); // Replace underscore with space and capitalize
            });

            // Update table
            var tableRows = labels.map(function(label, index) {
                return '<tr><td>' + label + '</td><td>' + prices[index] + '</td></tr>';
            }).join('');
            $('#commodity-prices-table').html(tableRows);

            // Update chart
            var ctx = document.getElementById('commodityChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Commodity Price (USD)',
                        data: prices,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }).fail(function(error) {
            console.error('Error fetching commodity prices:', error);
        });
    }

    fetchCommodityPrices();

    // Real-Time Clock Section
    function updateTimes() {
        // Port Moresby Time (PNG)
        var portMoresbyTime = new Date().toLocaleString('en-US', { timeZone: 'Pacific/Port_Moresby', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
        $('#png-time').text('PNG Time: ' + portMoresbyTime);

        // New York Time (US)
        var newYorkTime = new Date().toLocaleString('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
        $('#us-time').text('US Time: ' + newYorkTime);
    }

    updateTimes();
    setInterval(updateTimes, 1000); // Update every second
});