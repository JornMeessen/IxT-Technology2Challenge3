// Set api mapbox
mapboxgl.accessToken = 'pk.eyJ1Ijoiam9ybm1lZXNzZW4iLCJhIjoiY2s4cjc4ZDMyMDBnbjNlbzVkNGJmaG8zcyJ9.p8vEGJsvEn43zb360Jav9A';

// Set api openweahtermap
var openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/weather';
var openWeatherMapUrlApiKey = '769a935d380c307486ead9d28a400f08';

// Voeg de kaart toe aan de pagina 
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [5.998535, 48.758905],
  zoom: 4,
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// wacht totdat de map geladen is
map.on('load', function () {

  // nieuwe source places
    map.addSource('places', {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': restaurants
    }
  });

buildLocationList(restaurants);
  addMarkers();
});

function openweathermap(currentFeature) {
    // Usually you do not want to call an api multiple times, but in this case we have to
    // because the openWeatherMap API does not allow multiple lat lon coords in one request.

    var request = openWeatherMapUrl + '?' + 'appid=' + openWeatherMapUrlApiKey + '&lon=' + currentFeature.coordinates[0] + '&lat=' + currentFeature.coordinates[1];

    // Get current weather based on cities' coordinates
    fetch(request)
      .then(function(response) {
        if(!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(function(response) {
        
        // variable voor weather article 
        var today = new Date();
        var dagen = new Array('Sundag', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
        var maanden = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

        var city = currentFeature.properties.city;
        var type = response.weather[0].description;
        var iconUrl = 'http://openweathermap.org/img/w/'+response.weather[0].icon+'.png';
        var degC = Math.floor(response.main.temp - 273.15);

        // render weather in weather article,
        var weatherBox = document.getElementById('weather');
        //weatherBox.innerHTML = +  ' ' + type + '<br>' + '<img src="'+iconUrl+'"> </div>';
      
        forecastMessage =    '<div class="forecastMoment">';
        forecastMessage +=   '<h3> What is the weather in:</h3>';
        forecastMessage +=   '<h4>'+ city + ' ' + degC + '&#176;C </h4>'; 
        forecastMessage +=   '<h4>' + dagen[today.getDay()] + ' ' + today.getDate() + ' ' + maanden[today.getMonth()] + '</h4>'; 
        forecastMessage +=   '<h4>'+ type +'</h4>';
        forecastMessage +=   '<div><img src="'+iconUrl+'"></div>';
        forecastMessage +=   '</div>';

        weatherBox.innerHTML = forecastMessage;

        console.log(weatherBox);
      })



      .catch(function (error) {
        console.log('ERROR:', error);
      });

  };

// Voeg een markering toe aan de kaart voor elke winkelvermelding.
function addMarkers() {
        
  // Voor elke functie in het bovenstaande GeoJSON-object:
  restaurants.forEach(function(marker) {

    // div-element voor de markering. 
    var el = document.createElement('div');
  
    // Wijst een unieke `id` toe aan de markering.
    el.id = 'marker-' + marker.properties.id;
  
    // Wijs de klasse `marker` toe aan elke marker voor styling.
    el.className = 'marker';


    //  Maak een markering met behulp van het div-element
    //  hierboven gedefinieerd en voeg het toe aan de kaart.
    new mapboxgl.Marker(el, { offset: [0, -23] })
      .setLngLat(marker.coordinates)
      .addTo(map);

    /*  Luister naar het element en doe drie dingen wanneer erop wordt geklikt:
        1. Vlieg naar het punt
        2. Sluit alle andere pop-ups en geef een pop-up weer voor de aangeklikte winkel
        3. Markeer vermelding in zijbalk (en verwijder markering voor alle andere vermeldingen)
    */
    el.addEventListener('click', function(e) {
    
      // Vlieg naar het punt 
      flyToStore(marker);
    
      // Sluit alle andere pop-ups en geef een pop-up weer voor de aangeklikte winkel
      createPopUp(marker);

      // de weerbox actief maken.
      //document.getElementById("weather").classList.add('weatherVisible');
    
      // Markeer vermelding in zijbalk
      var activeItem = document.getElementsByClassName('active');
      e.stopPropagation();
      document.getElementById("weather").classList.add('weatherVisible');

      if (activeItem[0]) {
        activeItem[0].classList.remove('active');
      }
    
      var listing = document.getElementById(
        'listing-' + marker.properties.id
      );
      
      listing.classList.add('active');
    });
  });
}

// Voeg een vermelding voor elke winkel toe aan de zijbalk.
function buildLocationList(data) {
  restaurants.forEach(function(restaurant, i) {
  
    // Maak een snelkoppeling voor `store.properties`,
    // die hieronder meerdere keren zal worden gebruikt.

    var prop = restaurant.properties;

    // Voeg een nieuwe vermeldingssectie toe aan de zijbalk. 
    var listings = document.getElementById('listings');
    var listing = listings.appendChild(document.createElement('div'));
            
    // Wijs een unieke `id` toe aan de aanbieding.
    listing.id = 'listing-' + prop.id;
    
    // Wijs de klasse `item` toe aan elke aanbieding voor styling.
    listing.className = 'item';

    // Voeg de link toe aan de individuele vermelding die hierboven is gemaakt.
    var link = listing.appendChild(document.createElement('a'));
      link.href = '#';
      link.className = 'title';
      link.id = 'link-' + prop.id;
      link.innerHTML = prop.name;

    // Voeg details toe aan de individuele aanbieding.
    var details = listing.appendChild(document.createElement('div'));
        details.innerHTML = prop.city;
        details.innerHTML += ' &middot; ' + prop.address;
      // if (prop.phone) {
      //   details.innerHTML += ' &middot; ' + prop.phoneFormatted;
      // }

     /**
           * Listen to the element and when it is clicked, do four things:
           * 1. Update the `currentFeature` to the store associated with the clicked link
           * 2. Fly to the point
           * 3. Close all other popups and display popup for clicked store
           * 4. Highlight listing in sidebar (and remove highlight for all other listings)
           **/

          link.addEventListener('click', function(e) {
            for (var i = 0; i < restaurants.length; i++) {
              if (this.id === 'link-' + restaurants[i].properties.id) {
                var clickedListing = restaurants[i];
                flyToStore(clickedListing);
                createPopUp(clickedListing);
                openweathermap(clickedListing);
                document.getElementById("weather").classList.add('weatherVisible');
              }
            }
            var activeItem = document.getElementsByClassName('active');
            if (activeItem[0]) {
              activeItem[0].classList.remove('active');
            }
            this.parentNode.classList.add('active');
          });
      });
  }

/*  Gebruik 'flyTo' van Mapbox GL JS om de camera soepel te verplaatsen
    een bepaald middelpunt.
*/
function flyToStore(currentFeature) {
  map.flyTo({
    center: currentFeature.coordinates,
    zoom: 10
  });
}

// Maak een Mapbox GL JS `Popup`.
function createPopUp(currentFeature) {
  var popUps = document.getElementsByClassName('mapboxgl-popup');
  if (popUps[0]) popUps[0].remove();
  var popup = new mapboxgl.Popup({ closeOnClick: true })
  .setLngLat(currentFeature.coordinates)
  .setHTML(
    '<h3>' +
    currentFeature.properties.name +
    '</h3>' +
    '<h4>' +
    currentFeature.properties.address +
    '</h4>'
  )
  .addTo(map);
   openweathermap(currentFeature);
}

