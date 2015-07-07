require("../styl/listing-info-window.styl");

import ListingTile from "./ListingTile";

module.exports = React.createClass({
    displayName: 'ListingInfoWindow',

    componentDidMount() {
    },

    render() {
        return (
            <div ref="component" className="fng-listing-info-window">
                <ListingTile listing={this.props.listing} mapContext={true}/>
            </div>
        );
    }
});