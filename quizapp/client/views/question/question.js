Template.question.currentQuestion = function(){
	var currentQuestion = QuestionsList.findOne({ number : Session.get("currentQuestionNo")});
	return currentQuestion;
}

Template.question.questionCount = function(){
	return QuestionsList.find().count();
}

Template.question.events({
	'submit form' : function(theEvent, theTemplate){
		theEvent.preventDefault();
		console.log("submit was pressed");
		currentQuestionNo = Session.get("currentQuestionNo");
		console.log(currentQuestionNo);
		if( currentQuestionNo < QuestionsList.find().count()) {
			Session.set("currentQuestionNo", ++currentQuestionNo);
		} else {
		    console.log("no more questions");
		}
		//console.log(Session.get("score"));
	}
});