//alert("HELLO");
SC.initialize({
  client_id: '2897a04bef9a657aa20fc0b32c14cd33'
});

jQuery(document).ready(function($) {

  $.get("http://api.ipinfodb.com/v3/ip-city/?key=3195031531afca0af54214e7927e1c73b4d723ec9b6b8a7fd2722a8cc92dc58e&format=json", function (response) {
      var city = response.cityName;
      var state = response.regionName;
      $.ajax({
          url : "http://api.wunderground.com/api/b0a8fa82d88c7a78/geolookup/conditions/q/" + state + "/" + city + ".json",
          dataType : "jsonp",
          success : function(parsed_json) {
          
          var weather = parsed_json['current_observation']['weather'];
          document.getElementById("welcome").innerHTML = "You're listening in " + city + ", " + state + ", and the weather is currently " + weather + ". Refresh the browser to get a new song!";
          //alert(weather);
          var keyword = weather.toLowerCase();
          var genre = weather;
            if(keyword.search("thunderstorm") !== -1){
              genre = "AC DC";
            }
            else if(keyword.search("snow") !== -1){
              genre = "Mumford and sons";
            }
            else if(keyword.search("haze") !== -1){
              genre = "Hannibal";
            }
            else if(keyword.search("fog") !== -1){
              genre = "alt-j";
            }
            else if(keyword.search("drizzle") !== -1){
              genre = "drake";
            }
            else if(keyword.search("hail") !== -1){
              genre = "Pink Floyd";
            }
            else if(keyword.search("overcast") !== -1){
              genre = "Lana del Ray";
            }
            else if(keyword.search("dust") !== -1){
              genre = "Johny Cash";
            }
            else if(keyword.search("mist") !== -1){
              genre = "Ellie Goulding";
            }
            else if(keyword.search("clear") !== -1){
              genre = "the beatles";
            }
            else if(keyword.search("cloud") !== -1){
              genre = "Brown Bird";
            }
            else if(keyword.search("ice") !== -1){
              genre = "Vanilla Ice";
            }
            else if(keyword.search("sand") !== -1){
              genre = "Darude";
            }
            else if(keyword.search("smoke") !== -1){
              genre = "Johny Cash";
            }
            else if(keyword.search("rain") !== -1){
              genre = "John Legend";
            }
          else{
            genre = "classical";
            //alert(keyword.search("Jurassic Park"));
          }
          //alert(genre);
          //alert(weather);
          SC.get('/tracks', {
            q: genre, bpm: {from: 0}
          }).then(function(tracks) {
            track = tracks[Math.floor((Math.random() * 10))].permalink_url;
            var duration = tracks[Math.floor((Math.random() * 10))].duration;
            //alert(duration);
            SC.oEmbed(track, {
                auto_play: true,
                maxwidth: '600%',
                maxheight: '200%',
                element: document.getElementById('SoundCloudWidget')
            });
            

          });
  
          }     
        });
  }, "jsonp");
  
});
