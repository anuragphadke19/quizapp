Meteor.startup(function(){
	Session.set("currentQuestionNo", 1); 
	Session.set("score", 0);
	Session.set("showResult", false);
});

Meteor.subscribe('theQuestions');
Meteor.subscribe('userScores');



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
});

