(function(){
	
	var appDependencies = [
		'draggableModule'
	];
	var app = angular.module('soccer-match', appDependencies);
	
	app.service('playerFocus', function(){
		var subscriber = undefined;
		
		this.sendMessage = function(mex){
			subscriber(mex);
		};
		
		this.onMessage = function(callback){
			subscriber = callback;
		};
	});
	
	app.service('dataService', ['$http', function($http){
		// Global variables
		this.apiURL = 'http://localhost/quellicheilcalcetto/api/';
		this.players = {};
		this.match = {};
		
		this.getMatch = function(){
			// This also should be done via AJAX
			this.match = {
				id: 1,
				teamA: [{
							player_id: "1",
							player_x: "0.8",
							player_y: "0.5"
						}],
				teamB: [{
							player_id: "2",
							player_x: "0.1",
							player_y: "0.9"
						}]
			};
			return this.match;
		};
		
		this.getPlayers = function(){
			// Async reply, alias 'promise'
			var promise = $http.get( this.apiURL + 'players' )
							.success(function(data, status){
								this.players = data;
							})
							.error(function(data, status){
								console.log('AJAX error: ', status, data);
							});
			return promise;
		};
	}]);
	
	app.controller('MainController', ['$rootScope', 'dataService', function($rootScope, dataService){
		// Ask for players
		dataService.getPlayers().then( function(response){
			$rootScope.players = response.data;
		});
		
		// Ask for the match
		$rootScope.match = dataService.getMatch();
		
		$rootScope.isTeamA = function(id){
			return $rootScope.isTeam(id, $rootScope.match.teamA);
		};
		
		$rootScope.isTeamB = function(id){
			return $rootScope.isTeam(id, $rootScope.match.teamB);
		};
		
		$rootScope.isTeam = function(id, team){
			for(var i=0; i<team.length; i++){
				if(team[i].player_id == id)
					return true;
			}
		};
		
		$rootScope.hasTeam = function(id){
			return $rootScope.isTeamA(id) || $rootScope.isTeamB(id);
		};
		
		$rootScope.takeAwayFromTeam = function(pId){
			if($rootScope.isTeamA(pId)){
				$rootScope.takePlayerAwayFromTeam(pId, $rootScope.match.teamA);
			}
			if($rootScope.isTeamB(pId)){
				$rootScope.takePlayerAwayFromTeam(pId, $rootScope.match.teamB);
			}
		};
		
		$rootScope.takePlayerAwayFromTeam = function(pId, team) {
			console.log(team);
			for(var i=0; i<team.length; i++){
				if(team[i].player_id == pId)
					team.splice( i, 1 );
			}
		};

	}]);
	
	app.controller('FieldController', ['$rootScope', '$scope', function($rootScope, $scope){
		$scope.drop = function(x, y, dropped, target){
			
			// Which player?
			var pId = '' + dropped.data('playerId');
			
			// Which team was the player dropped in?
			var team1 = target.hasClass('teamA');
			var team2 = target.hasClass('teamB');
			
			// In wich position?	(maybe already inside the DOM)
			console.log(target.width(), target.height());
			console.log('position', x, y);
			
			var playerInTeam = {
							player_id: pId,
							player_x:'0.5',
							player_y:'0.1'
						};
						
			// If it was in another team, take it away
			$scope.takeAwayFromTeam(pId);
			
			// Refresh model
			if(team1)
				$rootScope.match.teamA.push( playerInTeam );
			else if(team2)
				$rootScope.match.teamB.push( playerInTeam );
			
			
			// Refresh scopes
			$rootScope.$apply();
			
			//console.log($rootScope.match);
		};
	}]);
	
	app.controller('PlayersListController', ['dataService', '$scope', 'playerFocus', function(dataService, $scope, playerFocus){
		
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
			for(i in $scope.players) {
				if($scope.players[i].player_id == $scope.player.player_id) {
					$scope.players.splice( i, 1 );
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
				$scope.players.push( $scope.player );
			} else {
				// Modify
				for(i in $scope.players){
					if( $scope.players[i].player_id == $scope.player.player_id){
						$scope.players[i] = angular.copy($scope.player);
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
					if($scope.players[i].player_id == id){
						$scope.player = angular.copy( $scope.players[i] );
					}
				}
			}
						
			// Show dialog
			$scope.show = true;				
		};
		playerFocus.onMessage($scope.focusPlayer);
	}]);
	
})();