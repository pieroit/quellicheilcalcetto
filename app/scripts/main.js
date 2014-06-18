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
	
	app.service('playerFocus', function(){
		var subscriber = undefined;
		
		this.sendMessage = function(mex){
			subscriber(mex);
		};
		
		this.onMessage = function(callback){
			subscriber = callback;
		};
	});
	
	app.controller('PlayersListController', function(playerFocus){
		this.players = players;
		
		this.playerDialog = function(p){
			playerFocus.sendMessage(p);			
		};
	});
	
	app.controller('ModalDialogController', function(playerFocus){
		var scope = this;
		scope.player = undefined;
		scope.show = false;
		
		scope.toggleDialog = function(){
			this.show = ! this.show;
		};
		
		scope.focusPlayer = function(p) {
			for(i in players){
				if(players[i].id == p){
					scope.player = players[i];
					scope.show = true;
				}
			}
				
			console.log(scope);
		};
		
		playerFocus.onMessage(scope.focusPlayer);
	});
	
})();