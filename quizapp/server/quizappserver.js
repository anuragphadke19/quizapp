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
	}
});
