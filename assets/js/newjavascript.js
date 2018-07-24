var initMap = function (pos) {

    var myPos = new google.maps.LatLng(pos.lat, pos.lng);
    var opts = {
        zoom: 12,
        streetViewControl: false,
        center: myPos
    };
    //.... var map1 = new google.maps.Map(googleMap, opts);
};
var otherPosition = {
    lat: 12.9938,
    lng: 23.3387,
    iconPath: 'assets/images/icons/png/Airport-icon.png'
};

initMap(otherPosition);
