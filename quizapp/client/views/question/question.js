Meteor.subscribe('theQuestions');

Template.question.helpers({
	currentQuestion: function(){
		var currentQuestion = QuestionsList.findOne({ number : Session.get("currentQuestionNo")});
		return currentQuestion;
	},
	questionCount: function(){
		return QuestionsList.find().count();
	}
});


Template.question.events({
	'submit form' : function(theEvent, theTemplate){
		theEvent.preventDefault();
		console.log("submit was pressed");
		currentQuestionNo = Session.get("currentQuestionNo");
		currentSelection = $('form input[type=radio]:checked').attr('id');
		console.log(currentSelection);
		if( currentQuestionNo < QuestionsList.find().count()) {
			Meteor.call('updateScore',currentQuestionNo, currentSelection);
			Session.set("currentQuestionNo", ++currentQuestionNo);
		} else {
		    console.log("no more questions");
		}
		//console.log(Session.get("score"));
	}
});