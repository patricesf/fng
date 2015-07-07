require("../styl/home.styl");

import $ from "jquery";
import Map from './Map';
import LocationSearch from './LocationSearch';
import ListingResults from './ListingResults';
import api from './api';

module.exports = React.createClass({

    MAUI: {lat: 20.85751082, lng: -156.66543083},

    HEIGHT_OF_HOME_TOP: 62,

    getInitialState() {
        return {height: 0};
    },

    componentDidMount() {
        $(window).on("resize", () => {
            this.onResize();
        });
        this.onResize();
        this.displayListingResults()
        var input = this.refs["locationSearch"].getInputControl();
        this.getMap().wireSearchInput(input);
    },

    onResize() {
        this.setState({height: $("body").height()-this.HEIGHT_OF_HOME_TOP});
    },

    displayListingResults() {
        var def = api.search();
        def.done( (results) => {
            var listings = results.results.hits;
            this.getMap().displayListingResults(listings);
            this.refs["listingResults"].update(listings);
        });
    },

    getMap() {
        return this.refs["map"];
    },

    render() {
        var styleMap = {height: `${this.state.height}px`};

        return (
            <div className="fng-home">
                <div className="fng-home-top">
                    <img className="fng-home-logo" src="/images/fng.png"/>
                    <LocationSearch ref="locationSearch"/>
                </div>
                <div className="fng-home-bottom" style={styleMap}>
                    <div className="fng-left-pane">
                        <ListingResults ref="listingResults"/>
                    </div>
                    <div className="fng-right-pane">
                        <Map ref="map" location={this.MAUI}/>
                    </div>
                </div>
            </div>
        );
    }
});