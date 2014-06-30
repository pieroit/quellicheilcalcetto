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
					var callback = underEl.attr('droptarget');
					
					// Re-display dragged element
					elm.css('display', 'block');
					
					if( callback === undefined ) {					
						elm.css('position', startCss.position);
						elm.css('top', startCss.top);
						elm.css('left', startCss.left);
						elm.removeClass('dragged');
					} else {
						// Do nothing, just leave the dragged element there!
					}
		        }	
			}
		};
	}]);
})();
