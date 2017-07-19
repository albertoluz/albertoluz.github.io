var $friends = $('#friends');
var $name = $('#name');
var $age = $('#age');

var friendTemplate = "" +
	"<li>" +
	"<p><strong>Name:</storng> {{name}}</p>" +
	"<p><strong>Age:</strong> {{age}}</p>" +
	"<button id='{{id}}' class='remove'>X</button>" +
	"</li>";

	function addFriend(friend){
		$friends.append(Mustache.render(friendTemplate, friend));	
	};
$(document).ready(function(){

	$.ajax({
		type: 'GET',
		url: 'http://rest.learncode.academy/api/alberto/friends',
		success: function(friends) {
			$.each(friends, function(i, friend){
				addFriend(friend);
			});
		},
		error: function(){
			alert('error loading friends');
		}
	});

	$('#add-friend').on('click', function(){

		var friend = {
			name: $name.val(),
			age: $age.val()
		};
		$.ajax({
			type: 'POST',
			url: 'http://rest.learncode.academy/api/alberto/friends',
			data: friend,
			success: function(newFriend){
				addFriend(newFriend);
			},
			error: function(){
				alert('error saving order');
			 }
	    });
	});


	$friends.delegate('.remove', 'click', function(){

		var $li = $(this).closest('li');

		$.ajax({
			type:'DELETE',
			url: 'http://rest.learncode.academy/api/alberto/friends/' + $(this).attr('id'),
			success: function(){
				$li.fadeOut(300, function(){
					$(this).remove();
				});
			}
		});
	});
});