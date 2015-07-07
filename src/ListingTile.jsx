require("../styl/listing-tile.styl");

import React from 'react';
import api from './api';

module.exports = React.createClass({

    images: null,
    imageIndex: 0,

    getInitialState() {
        return {imageUrl: null, stars: 0};
    },

    componentWillMount() {
        var stars = Math.ceil(Math.random()*5);
        var imageUrl = this.props.listing.galleryUrl;
        this.setState({imageUrl, stars});
    },

    renderStars(count) {
        var stars = [];
        for (var i = 0; i < count; i++) {
            stars.push(<i key={i} className="fa fa-star fng-listing-results-star"></i>);
        }
        return stars;
    },

    prevImage() {
       this.swapImage(-1);
    },

    nextImage() {
        this.swapImage(1);
    },

    swapImage(offset) {
        if(!this.images) {
            var def = api.getPropertyDetails(this.props.listing.spu);
            def.done( (result) => {
                this.images = result.images;
                this.swapImage(offset);
            });
        } else {
            var index = (this.imageIndex+offset)%this.images.length;
            if (index < 0) {
                index = this.images.length -1;
            }

            this.imageIndex = index;
            if (index < 0) {
                index = this.images.length -1;
            }

            var image = this.images[index].imageFiles[7];
            if (image.width == 400 && image.height == 300) {
                var imageUrl = image.secureUri;
                this.setState({imageUrl});
            } else {

                this.swapImage(offset);
            }
        }
    },

    render() {
        var result = this.props.listing;
        var imageUrl = this.state.imageUrl;
        var stars = this.state.stars;
        var pageDetailUrl = "http://www.homeaway.com" + result.detailPageUrl;
        var cx = React.addons.classSet;
        var map = (this.props.mapContext ? "map" : "");
        var tileClasses = cx("fng-listing-tile", map);

        return (
            <div className={tileClasses}>
                <div className="fng-listing-tile-image-container">
                    <div className="fng-listing-tile-left" onClick={this.prevImage}>
                        <i className="fa fa-chevron-left fng-listing-tile-left-icon"/>
                    </div>
                    <div className="fng-listing-tile-right" onClick={this.nextImage}>
                        <i className="fa fa-chevron-right fng-listing-tile-right-icon"/>
                    </div>
                        <a href={pageDetailUrl}>
                            <img className="fng-listing-tile-image" src={imageUrl}/>
                        </a>
                </div>
                <a href={pageDetailUrl}>
                    <div className="fng-listing-tile-text">
                        <div className="fng-listing-tile-headline">{result.headline}</div>
                        <div className="fng-listing-tile-headline-description">Entire home/apt · <span>{this.renderStars(stars)}</span> · <span>{result.reviewCount} reviews</span></div>
                    </div>
                </a>

            </div>);
    }
});