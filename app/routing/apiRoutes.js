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
    // Compatibility assist courtesy of Mich @ https://github.com/mchlltt/
    app.post("/api/brawlers", function (req, res) {

        var thisUser = req.body;
        var differences = [];

        // If there is more than one friend to compare to
        if (brawlData.length > 1) {
            // Step through these potential fighters
            brawlData.forEach(function(user) {
                var totalDifference = 0;

                // For each score, compare the scores and add the absolute value of the difference to the total difference.
                for (var i = 0; i < thisUser.scores.length; i++) {
                    var otherScore = user.scores[i];
                    var thisScore = thisUser.scores[i];
                    var difference = +otherScore - +thisScore;
                    totalDifference += Math.abs(difference);
                }

                differences.push(totalDifference);
            });

            // Find the minimum difference score
            var minimumDifference = Math.min.apply(null, differences);

            // Since there may be more than one potential fighter with that score, create an array
            var bestMatches = [];

            // For each item in differences, if it is equal to the minimumDifference, add the corresponding brawlData to the bestMatches array
            for (var i = 0; i < differences.length; i++) {
                if (differences[i] === minimumDifference) {
                    bestMatches.push(brawlData[i]);
                }
            }

            // Then send bestMatches to the client.
            res.json(bestMatches);
        // If there is only one friend to compare to, skip all that work and just send back that user
        } else {
            res.json(brawlData);
        }

        // Once you're done comparing, add the new user to the potential brawler data.
        brawlData.push(thisUser);




    });
};