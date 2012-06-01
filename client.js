var count = 1;
var yes = 0;
var no = 0;

var socket = io.connect('http://localhost');
socket.on('update', function(data){
	yes = data['yes'];
	no = data['no'];
	
	updateYes();
	updateNo()
})

setInterval(function () {
  $('.counter').text(count.toString());
  count++;
}, 1000);

plusYes = function() {
  //$.get('/plusyes', {}, function (data) { }, 'json');
	socket.emit('plusyes');
	console.log('plus yes');
}

plusNo = function() {
  //$.get('/plusno', {}, function (data) { }, 'json');
	socket.emit('plusno');
	console.log('plus no');
}

updateYes = function() {
  $('#yes').text(yes.toString());
}

updateNo = function() {
  $('#no').text(no.toString());
}

/*longPoll = function() {
  $.ajax({ cache: false
         , type: "GET"
         , url: "/poll"
         , dataType: 'json'
         , data: {yes: yes}
         , error: function () {
           alert('u got an error');
         }
         , success: function (data) {
            yes = data['yes'];
            no = data['no'];
            
            updateYes();
            updateNo();
            
            longPoll();
         }  
         });
}

$(document).ready(function() {
  longPoll();
});*/