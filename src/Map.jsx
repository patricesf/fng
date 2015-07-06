import $ from "jquery";
import PropertyInfoWindow from './PropertyInfoWindow';

module.exports = React.createClass({
    displayName: 'Home',
    lat: 20.85751082,
    lng: -156.66543083,
    map: null,
    markers: [],

    initMap() {
      var mapOptions = {
        center: {lat: this.lat,lng: this.lng},
        zoom: 8
      };

      this.map = new google.maps.Map(this.refs["component"].getDOMNode(), mapOptions);
    },

    wireSearchInput(input) {
      var map = this.map;

      var autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.bindTo('bounds', map);

      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        this.closeInfoWindow();
        var place = autocomplete.getPlace();

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


    displaySearchResults(results) {
      var map = this.map;

      for (var hit of results.results.hits) {
        let myLatlng = new google.maps.LatLng(hit.geoCode.latitude, hit.geoCode.longitude);
        let marker = new google.maps.Marker({
            position: myLatlng,
            map: map
        });

        this.markers.push(marker);

        let $el = $("<div/>");
        React.render((<PropertyInfoWindow property={hit}/>), $el[0]);
        let infowindow = new google.maps.InfoWindow({
              content: $el[0]
        });

        google.maps.event.addListener(infowindow, 'domready', function(){
          $(".gm-style-iw").next("div").hide();
        });

        google.maps.event.addListener(marker, 'click', () => {
            this.closeInfoWindow();
            this.currentInfoWindow = infowindow;
            infowindow.open(map, marker);
        });

        google.maps.event.addListener(map, 'click', () => {
            this.closeInfoWindow();
          });
        }
    },


    render() {
        return (
            <div ref="component" className="fng-home"/>
        );
    }
});
