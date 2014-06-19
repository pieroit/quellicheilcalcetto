(function(){
	console.log('\'Allo \'Allo!');
	
	var players = [
		{
			id: 1,
			name: 'Charles Foley',
			photo: 'images/gem-01.gif',
			stats: {
				attack: 5,
				defense: 7,
				technique: 6,
				stamina: 9
			}
		},
		{
			id: 2,
			name: 'Pippo',
			photo: 'images/gem-02.gif',
			stats: {
				attack: 6,
				defense: 10,
				technique: 9,
				stamina: 8
			}
		},
		{
			id: 3,
			name: 'Roberto',
			photo: 'images/gem-03.gif',
			stats: {
				attack: 7,
				defense: 7,
				technique: 10,
				stamina: 9
			}
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
	
	app.controller('PlayersListController', ['$scope', 'playerFocus', function($scope, playerFocus){
		$scope.players = players;
		
		$scope.playerDialog = function(p){
			playerFocus.sendMessage(p);			
		};
	}]);
	
	app.controller('ModalDialogController', ['$scope', 'playerFocus', function($scope, playerFocus){

		$scope.player = undefined;
		$scope.show = false;
		
		$scope.focusPlayer = function(p) {
			for(i in players){
				if(players[i].id == p){
					$scope.player = players[i];
					$scope.show = true;
				}
			}
			console.log($scope.player.stats);
		};
		
		playerFocus.onMessage($scope.focusPlayer);
	}]);
	
})();