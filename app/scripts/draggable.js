(function(){
	
	// Declare module and dependencies
	module = angular.module('draggableModule', []);
	
	var snoop = 'ciao snoop';
	
	// Directive
	module.directive('draggable', ['$document', function($document){
		// Return directive obj
		return {
			restrict: 'A',	// Attribute
			link: function( scope, elm, attrs ){
				var startX, startY, initialMouseX, initialMouseY;
				var startCss = {};
				startCss.position = elm.css('position');
				startCss.top = elm.css('top');
				startCss.left = elm.css('left');
		        
		        elm.on('mouseover', function(){
		        	elm.css('cursor', 'move');
		        });
		        
		        elm.on('mousedown', function($event) {
		        	$event.preventDefault();
		        	
					startX = elm.prop('offsetLeft');
					startY = elm.prop('offsetTop');
					initialMouseX = $event.clientX;
					initialMouseY = $event.clientY;
					
					elm.css({position: 'absolute'});
					elm.addClass('dragged');
					
					// Bind events to $document!
					$document.on('mousemove', mousemove);
					$document.on('mouseup', mouseup);
		        });
		 
		        function mousemove($event) {
					var dx = $event.clientX - initialMouseX;
					var dy = $event.clientY - initialMouseY;
					elm.css({
						top:  startY + dy + 'px',
						left: startX + dx + 'px'
					});
		        }
		 
		        function mouseup($event) {
					$document.unbind('mousemove', mousemove);
					$document.unbind('mouseup', mouseup);
					
					// Yeeees! Hide dragged element to see what there is under
					elm.css('display', 'none');
					
					var underEl = document.elementFromPoint($event.clientX, $event.clientY);
					underEl = angular.element(underEl);
					
					// Re-display dragged element
					elm.css('display', 'block');
					elm.css('position', startCss.position);
					elm.css('top', startCss.top);
					elm.css('left', startCss.left);
		        }	
			}
		};
	}]);
	
	module.directive('droptarget', ['$document', function($document){
		return {
			restrict: 'A',
			link: function(scope, elm, attr){
				
				var targetEl;
				
				$document.on('mousemove', function($event){
					var overEl = document.elementFromPoint($event.clientX, $event.clientY);
					overEl = angular.element(overEl);
					overEl.css('display', 'none');
					
					var downEl = document.elementFromPoint($event.clientX, $event.clientY);
					targetEl = angular.element(downEl);
					
					overEl.css('display', 'block');
				});
				
				$document.on('mouseup', function($event){
					var droppedEl = document.elementFromPoint($event.clientX, $event.clientY);
					droppedEl = angular.element(droppedEl);
					
					// Notify the scope about the drop details
					scope.drop( $event.clientX, $event.clientY, droppedEl, targetEl);
				});
			}
		};
	}]);
	
})();
