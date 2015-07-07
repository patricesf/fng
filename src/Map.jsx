require("../styl/map.styl");

import $ from "jquery";
import ListingInfoWindow from './ListingInfoWindow';

module.exports = React.createClass({
    displayName: 'Map',

    map: null,
    markers: [],

    initMap() {
        var location = this.props.location;

        if (location) {
            var mapOptions = {
                center: {lat: location.lat, lng: location.lng},
                zoom: 9
            };

            this.map = new google.maps.Map(this.refs["component"].getDOMNode(), mapOptions);
        }
    },

    wireSearchInput(input) {
        var map = this.map;

        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);

        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            this.closeInfoWindow();
            var place = autocomplete.getPlace();
                console.log(place);
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);  // Why 17? Because it looks good.
            }
        });
    },

    componentDidMount() {
      this.initMap();
    },

    clearSearchResults() {
        for (var marker of this.markers) {
            marker.setMap(null);
        }
        this.markers = [];
    },

    closeInfoWindow() {
        if (this.currentInfoWindow != null) {
            this.currentInfoWindow.close();
            this.currentInfoWindow = null;
        }
    },

    displayListingResults(listings) {
        var map = this.map;

        for (var listing of listings) {
            let myLatlng = new google.maps.LatLng(listing.geoCode.latitude, listing.geoCode.longitude);
            let marker = new google.maps.Marker({
                position: myLatlng,
                map: map
            });

            this.markers.push(marker);

            let $el = $("<div/>");
            React.render((<ListingInfoWindow listing={listing}/>), $el[0]);
            let infoWindow = new google.maps.InfoWindow({
                  content: $el[0]
            });

            this.fixInfoWindow(infoWindow);

            google.maps.event.addListener(marker, 'click', () => {
                this.closeInfoWindow();
                this.currentInfoWindow = infoWindow;
                infoWindow.open(map, marker);
            });

            google.maps.event.addListener(map, 'click', () => {
                this.closeInfoWindow();
              });
        }
    },

    fixInfoWindow(infoWindow) {
        google.maps.event.addListener(infoWindow, 'domready', () => {
            $(".gm-style-iw").next("div").hide();
                // Reference to the DIV which receives the contents of the infoWindow using jQuery
                var iwOuter = $('.gm-style-iw');

                /* The DIV we want to change is above the .gm-style-iw DIV.
                * So, we use jQuery and create a iwBackground variable,
                * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
                */
                var iwBackground = iwOuter.prev();

                // Remove the background shadow DIV
                iwBackground.children(':nth-child(2)').css({'display' : 'none'});

                // Remove the white background DIV
                iwBackground.children(':nth-child(4)').css({'display' : 'none'});
        });
    },

    render() {
        return (
            <div ref="component" className="fng-map"/>
        );
    }
});