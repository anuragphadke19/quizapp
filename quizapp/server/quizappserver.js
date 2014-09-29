Meteor.publish('theQuestions', function() {
	return QuestionsList.find();
});
Meteor.publish('userScores', function() {
	var currentUserId = this.userId;
	return UserScores.find({ userId : currentUserId });
});
Meteor.methods({ 
	'pushScore' : function(playerId, playerScore) {
		UserScores.upsert({ userId : playerId}, {$push : {scores : playerScore}});
	},
	'updateScore' : function(questionNumber, userSelection) {
		var playerId = this.userId;
		var currentScore = CurrentScore.findOne({userId : playerId});
		console.log(userSelection);
		var currentQuestion = QuestionsList.findOne({number : questionNumber});
		if (currentScore === undefined){
			var score = 0;
		} else {
			var score = currentScore.currentScore;
		}
		if (currentQuestion.correctAnswer === userSelection) {
			score += 2;
		} else {
			score -= 1;
		}
		CurrentScore.upsert({userId: playerId}, {userId : playerId, currentScore : score, currentQuestion : currentQuestion.number});
		console.log("running score :: "+ score);
	}
});
