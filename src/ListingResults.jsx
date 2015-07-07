require("../styl/listing-results.styl");

import ListingTile from "./ListingTile";

module.exports = React.createClass({

    getInitialState() {
        return {listings: []};
    },

    update(listings) {
        this.setState({listings});
    },

    renderListings() {
        return this.state.listings.map((listing) => {
             return (<div key={listing.spu} className="fng-listing-results-tile">
                <div className="fng-listing-results-tile-inner">
                    <ListingTile listing={listing}/>
                </div>
            </div>);
        });
    },

    render() {
        return (
            <div className="fng-listing-results">
                {this.renderListings()}
            </div>
        );
    }
});