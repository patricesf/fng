require("../styl/home.styl");

import $ from "jquery";
import PropertyInfoWindow from './PropertyInfoWindow';
import Map from './Map';
import LocationSearch from './LocationSearch';
import SearchResults from './SearchResults';


module.exports = React.createClass({

    componentDidMount() {
        this.displaySearchResults()

        var input = this.refs["locationSearch"].getInputControl();
        this.getMap().wireSearchInput(input);
    },

    displaySearchResults() {
        var def = $.get('../data/maui.json');
        def.done( (results) => {
          this.getMap().displaySearchResults(results);
          this.refs["searchResults"].update(results);
        });
    },

    getMap() {
        return this.refs["map"];
    },

    render() {
        return (
            <div className="fng-home">
                <div>
                    <img className="fng-home-logo" src="/images/fng.png"/>
                    <LocationSearch ref="locationSearch"/>
                </div>
                <div className="fng-search-results">
                    <div className="fng-left-pane">
                        <SearchResults ref="searchResults"/>
                    </div>
                    <div className="fng-right-pane">
                        <Map ref="map"/>
                    </div>
                </div>
            </div>
        );
    }
});