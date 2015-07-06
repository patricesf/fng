require("../styl/location-search.styl");


module.exports = React.createClass({

    getInputControl() {
        return this.refs["searchInput"].getDOMNode();
    },

    render() {
        return (
            <div className="fng-location-search">
                <i className="fa fa-search fng-location-search-icon"></i><input className="fng-location-search-input" ref="searchInput" placeholder="Where do you want to go?"/>
            </div>
        );
    }
});