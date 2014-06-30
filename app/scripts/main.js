(function(){
	
	// Global variables
	var apiURL = 'http://localhost/quellicheilcalcetto/api/';
	var players;
	
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
	
	app.controller('PlayersListController', ['$http', '$scope', 'playerFocus', function($http, $scope, playerFocus){
		
		$http.get( apiURL + 'players' )
			.success(function(data, status){
				console.log(status, 'Players: ', data);
				players = data;
				$scope.players = players;
			})
			.error(function(data, status){
				console.log(status, data);
			});
			
		$scope.playerDialog = function(p){
			playerFocus.sendMessage(p);			
		};
			
		$scope.playerDialog = function(p){
			playerFocus.sendMessage(p);			
		};
	}]);
	
	app.controller('ModalDialogController', ['$scope', 'playerFocus', function($scope, playerFocus){
		
		// Used to hide dialog and init $scope
		$scope.hide = function() {
			$scope.player = undefined;
			$scope.show = false;
		};
		
		// Init !!!
		$scope.hide();
		
		// Delete player
		$scope.removeAndHide = function() {
			for(i in players) {
				if(players[i].player_id == $scope.player.player_id) {
					players.splice( i, 1 );
				}
			}
			$scope.hide();
		};
		
		// Save player
		$scope.saveAndHide = function() {
			// Player data validation
			
			// Add player or modify him
			if( $scope.player.player_id === undefined ) {
				// Assign id
				console.log('improove id assign');
				$scope.player.player_id = Math.floor( Math.random()*10000 );
				players.push( $scope.player );
			} else {
				// Modify
				for(i in players){
					if(players[i].player_id == $scope.player.player_id){
						players[i] = angular.copy($scope.player);
					}
				}
			}
			
			// Hide dialog
			$scope.hide();
		};
		
		// Select player
		$scope.focusPlayer = function(id) {
			if( id === undefined ) {
				// Create new
				$scope.player = {};
			}
			else {
				// Retrieve			
				for(i in players){
					console.log(i);
					if(players[i].player_id == id){
						$scope.player = angular.copy( players[i] );
					}
				}
			}
						
			// Show dialog
			$scope.show = true;				
		};
		playerFocus.onMessage($scope.focusPlayer);
	}]);
	
})();