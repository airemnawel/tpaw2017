window.onload = function(){
    document.getElementById("searchCity").addEventListener("submit", function(event){
        event.preventDefault(); // pour annuler le rechargement de la page
        var city = document.getElementById("city").value;
        searchCity(city);
    });    
}

function searchCity(_city){
    console.log('searchCity','Hello from '+_city);
    //A compléter dans la suite du TP
    
    var request =   new XMLHttpRequest();
    request.open('GET','http://api.openweathermap.org/data/2.5/weather?q='+_city+'&appid=0ada432b59deb9716c357092c5f79be6',true);
    request.onload = function() {
        if (request.status >=200 && request.status <400) {
            // Success!
            var responseJSON = JSON.parse(request.responseText);
            var nom= responseJSON.name;
            var temperature= (responseJSON.main.temp - 273.15).toFixed(0) + "°";
            var humidity = responseJSON.main.humidity;
            var cloud = responseJSON.clouds.all;
            var wind = responseJSON.wind.speed;
            var icon = responseJSON.weather[0].icon;
            var img_url = "http://maps.googleapis.com/maps/api/staticmap?center="+responseJSON.name +"&zoom=13&size=300x300&maptype=roadmap&markers="+responseJSON.name +"";
            
          document.getElementById("map").innerHTML = '<img src="'+img_url+'"/>';
          
            document.getElementById('name').innerHTML = responseJSON.name;
           document.getElementById('icon').src ="http://openweathermap.org/img/w/"+icon+".png";
            document.getElementById('temp').innerHTML = temperature;
            document.getElementById('temps').innerHTML = responseJSON.weather[0].description ;
            document.getElementById('Humidity').innerHTML = " Humidity : "+humidity+"%" ;
            document.getElementById('nuage').innerHTML = "Nuage : "+cloud+"%" ;
            document.getElementById('vent').innerHTML = "Vent : "+wind+"m/s"
            document.getElementById("result").style.display = "initial";
        } else {
            // We reached our target server, but it returned an error
        }
    };
    
    request.onerror = function() {
            // There was a connection error of some sort
    }

   request.send();
}
