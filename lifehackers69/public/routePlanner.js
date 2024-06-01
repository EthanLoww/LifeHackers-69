import { useJsApiLoader, GoogleMap, Marker,  } from "@react-google-maps/api";

function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: {lat: 41.85, lng: -87.65}  // Centered at Chicago
    });
    
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    // Example of origin, destination, and waypoints
    const origin = 'Chicago, IL';
    const destination = 'Los Angeles, CA';
    const waypoints = [
        { location: 'Joplin, MO' },
        { location: 'Oklahoma City, OK' }
    ];

    calculateAndDisplayRoute(directionsService, directionsRenderer, origin, destination, waypoints);
}

function calculateAndDisplayRoute(directionsService, directionsRenderer, origin, destination, waypoints) {
    directionsService.route({
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
    }, (response, status) => {
        if (status === 'OK') {
            directionsRenderer.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

window.onload = initMap;