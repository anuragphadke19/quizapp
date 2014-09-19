Meteor.startup(function(){
	Session.set("currentQuestionNo", 1); 
	Session.set("score", 0);
	Session.set("showResult", false);
});

Meteor.subscribe('theQuestions');
Meteor.subscribe('userScores');

Template.question.currentQuestion = function(){
	var currentQuestion = QuestionsList.findOne({ number : Session.get("currentQuestionNo")});
	return currentQuestion;
}

Template.page.showResult = function(){
	return Session.get("showResult");
}

Template.question.questionCount = function(){
	return QuestionsList.find().count();
}

Template.result.showResult = function(){
	return Session.get("score");
}

Template.result.events({
	'click #try-again' : function(){
		if (Meteor.userId()){
				console.log("I am called");
				Meteor.call('pushScore', Meteor.userId(), Session.get("score"));
			}
		Session.set("score", 0);
		Session.set("showResult", false);
		$("#home").parent().addClass("active");
	    $("#result").parent().removeClass("active");
	}
});

Template.page.events({
	'click #result' : function(theTemplate){
		Session.set("showResult", true);
		$("#home").parent().removeClass("active");
	    $("#result").parent().addClass("active");
	},
	'click #home' : function(theTemplate){
		Session.set("score", 0);
		Session.set("showResult", false);
		$("#home").parent().addClass("active");
	    $("#result").parent().removeClass("active");
	}
})

Template.question.events({
	'submit form' : function(theEvent, theTemplate){
		theEvent.preventDefault();
		var currentQuestionNo = theTemplate.find("#currentQNumber").value;
		//console.log(parseInt(currentQuestionNo));
		var radioCheckedValue = $('input:radio:checked').next('label').text();
		var correctAnswerValue = QuestionsList.findOne({number : parseInt(currentQuestionNo)}).correctAnswer;
		var currentScore = Session.get("score");
		//console.log(correctAnswerValue);
		if (radioCheckedValue === correctAnswerValue){
			currentScore += 2; 
		} else {
			currentScore -= 1;
		}
		Session.set("score", currentScore);
		if( currentQuestionNo < 5) {
			Session.set("currentQuestionNo", ++currentQuestionNo);
		} else {
			Session.set("currentQuestionNo", 1);
			Session.set("showResult", true);
		}
		$("#home").parent().removeClass("active");
	    $("#result").parent().addClass("active");
		
		
		//console.log(Session.get("score"));
	}
});