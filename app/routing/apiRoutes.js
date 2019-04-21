// LOAD DATA
// linking brawlArray via require

const brawlData = require("../data/brawlers");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests

    // This displays the JSON of our possible 
    app.get("/api/brawlers", function (req, res) {
        res.json(brawlData);
    });


    // API POST Requests

    // This posts new brawler data to our array
    // eventually will handle compatibility logic
    app.post("/api/brawlers", function (req, res) {

    });
};