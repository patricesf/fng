require("../styl/search-results.styl");
import PropertyTile  from "./PropertyTile";

module.exports = React.createClass({

    getInitialState() {
        return {results: []}
    },

    update(results) {
        this.setState({results: results.results.hits});
    },

    renderStars(count) {
        var stars = [];
        for (var i = 0; i < count; i++) {
            stars.push(<i className="fa fa-star fng-search-results-star"></i>);
        }
        return stars;
    },

    renderResults() {
        var results = [];
        for (var result of this.state.results) {
            results.push(
                <div className="fng-search-results-tile">
                    <div className="fng-search-results-tile-inner">
                        <PropertyTile info={result}/>
                    </div>
                </div>
            );
        }
        return results;
    },

    render() {
        return (
            <div className="fng-search-results">
                {this.renderResults()}
            </div>
        );
    }
});