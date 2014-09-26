Router.map(function() {
	this.route('result');
	this.route('question', {
  		waitOn: function() {
    		return Meteor.subscribe('theQuestions');
  			}
		}),
	this.route('welcome', {
		path : '/'
	})
});

Router.configure({
	layoutTemplate: 'mainLayout',
	loadingTemplate: 'loading'
});