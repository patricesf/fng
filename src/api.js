import $ from "jquery";

module.exports = {

    search() {
        return $.get("../data/maui.json");
    },

    getPropertyDetails(propertyId) {
        return $.get(`../data/properties/${propertyId}.json`);
    }
};