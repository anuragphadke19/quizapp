Router.map(function() {
	this.route('result');
	this.route('welcome', {
		path : '/'
	})
});

Router.configure({
	layoutTemplate: 'mainLayout'
});