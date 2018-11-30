
        var myLatLng;
        var latit;
        var longit;
        function geoSuccess(position) {

            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;
            myLatLng = {
                lat: latitude,
                lng: longitude
            };
            console.log(myLatLng)
            var mapProp = {
                //            center: new google.maps.LatLng(latitude, longitude), // puts your current location at the centre of the map,
                zoom: 15,
                mapTypeId: 'roadmap',
            };
            var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;
            //call renderer to display directions
            directionsDisplay.setMap(map);
            directionsDisplay.setPanel(document.getElementById('right-panel'));
            var bounds = new google.maps.LatLngBounds();
         
            // Multiple Markers
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: 'My location'
            });
            var markers = [
                ['Safeway on Shattuck Ave', 37.879390, -122.269954],
                ['Safeway on Shattuck Pl', 37.881114, -122.270072],
                ['Safeway on Solano Ave, Berkeley', 37.891479, -122.278612],
                ['Safeway on Solano Ave, Albany', 37.890905, -122.286837],
                ["Trader Joe's on University", 37.871989, -122.273304],
                ['Shattuck Market', 37.865654, -122.267189],
                ['Republic of V (Vegan)', 37.871096, -122.279374],
                ['Berkeley Natural Grocery Company', 37.881385, -122.288615],
                ['Whole Foods Market on Gilman', 37.881841, -122.297973],
                ['Whole Foods Market on Telegraph', 37.855922, -122.260517],
                ['Mi Tierra Foods on San Pablo', 37.869071, -122.291840],
                // ['my current location', latitude, longitude]
            ];
            
            // Loop through our array of markers & place each one on the map
            for (i = 0; i < markers.length; i++) {
                var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
                bounds.extend(position);
                marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    title: markers[i][0]
                });
                // Allow each marker to have an info window
                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        
                        latit = marker.getPosition().lat();
                        longit = marker.getPosition().lng();
                  
                    }
                })(marker, i));
                marker.addListener('click', function () {
                    directionsService.route({
                        origin: myLatLng,
                        destination: {
                            lat: latit,
                            lng: longit
                        },
                        travelMode: 'DRIVING'
                    }, function (response, status) {
                        if (status === 'OK') {
                            directionsDisplay.setDirections(response);
                        } else {
                            window.alert('Directions request failed due to ' + status);
                        }
                    });
                });
                // Automatically center the map fitting all markers on the screen
                map.fitBounds(bounds);
            }
        }
        function geoError() {
            alert("Geocoder failed.");
        }
        function getLocation() {
            if (navigator.geolocation) {
                console.log(navigator.geolocation)
                navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
                // alert("Geolocation is supported by this browser.");
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }
