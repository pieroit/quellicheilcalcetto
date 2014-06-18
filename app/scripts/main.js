(function(){
	console.log('\'Allo \'Allo!');
	
	var players = [
		{
			id: 1,
			name: 'Charles Foley',
			photo: 'images/gem-01.gif'
		},
		{
			id: 2,
			name: 'Pippo',
			photo: 'images/gem-02.gif'
		},
		{
			id: 3,
			name: 'Roberto',
			photo: 'images/gem-03.gif'
		}
	];
	
	var app = angular.module('soccer-match', []);
	
	app.controller('PlayersListController', function(){
		this.players = players;
	});
	
})();