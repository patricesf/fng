require("../styl/search-results.styl");

import React from 'react';

module.exports = React.createClass({

    renderStars(count) {
        var stars = [];
        for (var i = 0; i < count; i++) {
            stars.push(<i className="fa fa-star fng-search-results-star"></i>);
        }
        return stars;
    },

    render() {
        var result = this.props.info;
        var stars = Math.ceil(Math.random()*5);

        var cx = React.addons.classSet;
        var map = (this.props.mapContext ? "map" : "");
        var headlineClasses = cx("fng-search-results-tile-headline", map);
        var descriptionClasses = cx("fng-search-results-tile-headline-description", map);

        return (
            <div className="fng-property-tile">
                <a href={"http://www.homeaway.com" + result.detailPageUrl}>
                    <img className="fng-search-results-tile-image" src={result.galleryUrl}/>

                    <div className="fng-search-results-tile-text">
                        <div className={headlineClasses}>{result.headline}</div>
                        <div className={descriptionClasses}>Entire home/apt · <span>{this.renderStars(stars)}</span> · <span>{result.reviewCount} reviews</span></div>
                    </div>
                </a>
            </div>);
    }
});