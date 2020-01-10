//INCUDES TWO ROUTES
var friends = require("../data/friends");
module.exports = function(app) {

//A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
app.get("/api/friends", function(req, res) {
    res.json(friends);
});


//A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
app.post("/api/friends", function(req, res) {
    var score = 41;
    var userScores = 0;
    var bestFriend;
    for (var i = 0; i < req.body.scores.length; i++) {
        userScores += req.body.scores[i];
    }
    for (var i = 0; i < friends.length; i++) {
        var friendScores = 0;
        for (var x = 0; x < friends[i].scores.length; x++){
            friendScores += friends[i].scores[x];
        }
        var sum = Math.abs(friendScores - userScores);
        if (sum < score) {
            bestFriend = i;
            score = sum;
        }
    }
    res.json(friends[bestFriend]);
    friends.push(req.body);
});
}