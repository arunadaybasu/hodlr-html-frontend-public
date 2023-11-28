

(function($) {
    /* "use strict" */
	
 var dzChartlist = function(){
	
	var screenWidth = $(window).width();	
	var initChatSockets = function(){
		
		const URL = 'http://localhost:4000';
    const socket = io(URL, {
    	cors: {
				origin: URL
		  }
    });

    const form = document.getElementById('chat-form-1');
    const input = document.getElementById('chat-input-1');
    const messages = document.getElementById('chat-messages-1');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (input.value) {
        socket.emit('chat-message-2', input.value);
        input.value = '';
      }
    });

    socket.on('chat-message-1', (msg) => {
      console.log(msg);
      const item = document.createElement('li');
      item.textContent = msg;
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    });

	}
	
	/* Function ============ */
		return {
			init:function(){
			},
			
			
			load:function(){
				initChatSockets();
				
			},
			
			resize:function(){
			}
		}
	
	}();

	
		
	jQuery(window).on('load',function(){
		setTimeout(function(){
			dzChartlist.load();
		}, 2000); 
		
	});

     

})(jQuery);