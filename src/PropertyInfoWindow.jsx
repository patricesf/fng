require("../styl/property-info-window.styl");

import PropertyTile from "./PropertyTile";

module.exports = React.createClass({
    displayName: 'PropertyInfoWindow',

    componentDidMount() {
    },

    render() {
        return (
            <div ref="component" className="fng-property-info-window">
                <PropertyTile info={this.props.property} mapContext={true}/>
            </div>
        );
    }
});