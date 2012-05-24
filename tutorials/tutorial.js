
Tutorial = {};

(function(my, $){
	"use strict";
	function blink(interval){
		"use strict";
		var timer = window.setInterval(function(){
		    $("img.highlighter").each(function(){
		    		//$(this).css("opacity", "0");
		    		$(this).fadeOut(1000, function(){});
		    	});
		    window.setTimeout(function(){
		    $("img.highlighter").each(function(){
		    		//$(this).css("opacity", "1");
		    		$(this).fadeIn(1600, function(){});
		    	});
		    }, 1000);
		}, interval);
	}

	/*highlight an element's section*/
	my.highlightSection = function(x, y, width, height, isCircular){
		"use strict";
		var highlightDiv = $('<div class = "highlight"></div>');
		var body = $('body');
		body.append(highlightDiv);
		highlightDiv.offset({left: x, top: y});
		highlightDiv.width(width);
		highlightDiv.height(height);
		var imageUrl;
		if(isCircular){
			imageUrl = ('../tutorials/circ_highlighter.png');
			highlightDiv.css('background-image', 'url(' + imageUrl + ')');
			highlightDiv.css('background-size', '100% 100%');
			highlightDiv.css('background-repeat' ,'no-repeat');
		}else{
			imageUrl = encodeURI('../tutorials/rect_highlighter.png');
			highlightDiv.css('background-image', 'url(' + imageUrl + ')');
			highlightDiv.css('background-size', '100%');
			highlightDiv.css('background-repeat' ,'no-repeat');
		}
		blink(3000, 1000);
		
	}

	/*create temporary speech bubble*/
	function createSpeechBubble(target, text){
		"use strict";
		var bubbleContainer = $('<div id = "container"></div>');
		$('body').append(bubbleContainer);
		bubbleContainer.text(text);
		bubbleContainer.offset({left: target.x + target.r, top: target.y + target.r});
		bubbleContainer.css('opacity', '0');
	}

	/*if you need to remove the highlighter*/
	my.unhighlightSection = function(){
		$('div.highlight').each(function(){
			$(this).remove();
		});
		$('div#container').remove();
	}
	/*add speech bubble*/
	my.placeBubble = function(target, text){
		"use strict";
		if($('#container').length > 0){
			$('#container').each(function(){
				$(this).remove();	
			});
		}
		createSpeechBubble(target, text);
		var bubbleContainer = $('div#container');
		var x = target.x + target.r;
		var y = target.y + target.r;
		var otherY = target.y - bubbleContainer.height();
		var removed = false;
		if((x + bubbleContainer.width()) > $(document).width()){
			x = target.offset().left - bubbleContainer.width();
			removed = true;
			bubbleContainer.remove();
		}
		if((y + bubbleContainer.height()) > $(document).height()){
			y = otherY;
			if(!removed){
				bubbleContainer.remove();
				removed = true;
			}
		}
		if(removed){
		bubbleContainer = $('<div id = "container"></div>');
		$('body').append(bubbleContainer);
			bubbleContainer.text(text);
			bubbleContainer.offset({left: x, top: y});
		}
		bubbleContainer.draggable({scroll: false, containment: $('body')});
		$('div#container').css('opacity', '.8');
	}

  var call_script = function(script_name){
    try {
      $('#container').hide()
      eval(script_name + "_events()")
//      console.log("called ", script_name, "_events()")
    } catch (ReferenceError) {
//      console.log("tried but failed to call ", script_name, "_events().  ")//this is called if you cannot find _events()
//      console.log("The error:", ReferenceError)
    }
  }

  my.circuitChanged = function(){
//    console.log("calling level")
    var script = LevelSelector.getCurrentLevel().script
//    console.log("the script is", script)
    call_script(script)
  }
}(Tutorial, jQuery));
