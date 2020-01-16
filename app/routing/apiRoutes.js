//INCUDES TWO ROUTES
var friends = require("../data/friends");
module.exports = function(app) {

//A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
app.get("/api/friends", function(req, res) {
    res.json(friends);
});


//A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
app.post("/api/friends", function(req, res) {
    
    var userAnswers = req.body.scores;
    var bestFriend;
    //tempMatch holds the friends array object that will be compared
    var tempMatch = [];
    //tempAnswers holds the array of answers from the friends array as its being compared to the user answers
    var tempAnswers = [];

    var currentCount = 100;

    for (var i = 0; i < friends.length; i++) {
        tempMatch = friends[i];
        tempAnswers = friends[i].scores;
        
        var newCount = 0;

        for (var i = 0; i < tempAnswers.length; i++) {
            newCount += Math.abs(parseInt(tempAnswers[i]) - parseInt(userAnswers[i]))
        }
        if (newCount < currentCount) {
            bestFriend = tempMatch;
            
            currentCount = newCount;
        }
    }

    res.json(bestFriend);
    friends.push(req.body);
    });
}