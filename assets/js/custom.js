(function () {
    var places = [
    {
       lat:51.4871691,
       lng:-9.7222048,
       title:"Küste Irland",
       info:"Eine wunderschöne verträumte Landschaft voller böser Überraschungen",
       image:"assets/images/irland.png"
    },
    {
       lat:51.5431443,
       lng:-9.8679562,
       title:"Bere Island",
       info:"Bere Island mit einigen Bären und vielen Beeren",
       image:"assets/images/bere_island.png"
    },
    {
       lat:51.6162288,
       lng:-9.9813169,
       title:"Dzogchenbeara",
       info:"Der Lama lässt grüßen",
       image:"assets/images/dzogchenbeara.png"
    }
  ];
  var initPlaces = function(places){
      var marker;
      //allgem. Karte
      if(places.length===0){
          return false;
        }
        else{
            var posMap = new google.maps.LatLng(places[0].lat, places[0].lng);
            console.log(places);
            var opts = {
                zoom: 9,
                streetViewControl: true,
                center: posMap,                
                styles:[{
                      featureType: 'poi',
                      elementType: 'labels.text.fill',
                      stylers: [{color: '#d59563'}]
                    },
                    {
                      featureType: 'poi.park',
                      elementType: 'geometry',
                      stylers: [{color: '#263c3f'}]
                    },
                    {
                      featureType: 'poi.park',
                      elementType: 'labels.text.fill',
                      stylers: [{color: '#6b9a76'}]
                    },                    
                    {
                      featureType: 'road',
                      elementType: 'geometry.stroke',
                      stylers: [{color: '#212a37'}]
                    },
                    {
                      featureType: 'road',
                      elementType: 'labels.text.fill',
                      stylers: [{color: '#9ca5b3'}]
                    },
                    {
                      featureType: 'road.highway',
                      elementType: 'geometry',
                      stylers: [{color: '#746855'}]
                    },
                    {
                      featureType: 'road.highway',
                      elementType: 'geometry.stroke',
                      stylers: [{color: '#1f2835'}]
                    },
                    {
                      featureType: 'road.highway',
                      elementType: 'labels.text.fill',
                      stylers: [{color: '#f3d19c'}]
                    },                    
                    {
                      featureType: 'water',
                      elementType: 'geometry',
                      stylers: [{color: 'blue'}]
                    },
                    {
                      featureType: 'water',
                      elementType: 'labels.text.fill',
                      stylers: [{color: 'clover'}]
                    },
                    {
                      featureType: 'water',
                      elementType: 'labels.text.stroke',
                      stylers: [{color: 'pink'}]
                    }
                  ]

            };
            var map = new google.maps.Map(googleMap, opts);
        }
        for (var i = 0, max = places.length; i < max; i++) {                
            marker=new google.maps.Marker({
                position: new google.maps.LatLng(places[i].lat,places[i].lng),
                icon:places[i].image,
                map: map,                
                title:places[i].title                
            });
            initInfo(places[i].title, places[i].info, marker);
        }
    };
        var initInfo=function(title, info, marker){
            var contentString = '<div>'+
                '<h5>'+title+'</h5>'+
                '<p>' + info + '</p>'+
                '</div>';
            var infowindow = new google.maps.InfoWindow({
                content: contentString,
                maxWidth:120            
            });
            marker.addListener('click', function(){
                infowindow.open(marker.map, marker);
            });
            
        
  }

    var initMap = function () {
        
        var lat = parseFloat(this.getAttribute('data-lat'));
        var lng = parseFloat(this.getAttribute('data-lng'));        
        var btnTitle = this.getAttribute('data-title')||'MY POSITION';
        var btnInfo = this.getAttribute('data-info')|| '';
        var btnImage = this.getAttribute('data-image') || 'assets/images/cat1.png';
        
        if(isNaN(lat)||isNaN(lng)){
           if(navigator.geolocation){
               navigator.geolocation.getCurrentPosition(function(pos){
                  var actLat =  pos.coords.latitude;
                  var actLng = pos.coords.longitude;
                  var actTitle = btnTitle;
                  var actInfo = btnInfo;
                  var actImage = btnImage;
                  //console.log('i:',lat, lng);
                  drawMap(actLat, actLng, actTitle, actInfo, actImage);
               });
           }
        }
        else{
            drawMap(lat, lng, btnTitle, btnInfo, btnImage);
            //console.log('i:',lat, lng);
        }
        
        
    };
    var drawMap = function(lat, lng, btnTitle, btnInfo, btnImage){
        

        var pos = new google.maps.LatLng(lat, lng);

        var opts = {
            zoom: 16,
            streetViewControl: true,
            center: pos,
            title:btnTitle
        };
        
        var map = new google.maps.Map(googleMap, opts);        
        var marker = new google.maps.Marker({
            position: pos,
            icon:btnImage,
            map: map,
            title:btnTitle            
        });
        var contentString = '<div>'+
                '<h5>'+btnTitle+'</h5>'+
                '<p>' + btnInfo + '</p>'+
                '</div>';
        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth:200            
        });
        marker.addListener('click', function(){
            infowindow.open(map, marker);
        });
    }

    var googleMap = document.querySelector('#googleMap');
    var btns = document.querySelectorAll('[data-role="targets"] button');

    for (var i = 0, max = btns.length; i < max; i++) {
        btns[i].addEventListener('click', initMap);
    }
    var btnPlaces = document.querySelector('button[data-role="places"]');
    //um verschiedene Parameter in einer Funktion übergeben zu können, wird die jeweilige Funktion in einer anonymen Funtkion übergeben
    btnPlaces.addEventListener('click', function(){
        initPlaces(places);
    });
})();