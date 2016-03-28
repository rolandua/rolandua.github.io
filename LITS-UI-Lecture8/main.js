var listeners = [];

function listen(givenEventName, givenCallback){
	listeners.push({
		'eventName': givenEventName,
		'callback': givenCallback
	});
}

function trigger(triggeredEventName, eventData){
	listeners.forEach(function(listener){
		if (triggeredEventName = listener.eventName)
			listener.callback(eventData);
	})
}

var button1 = document.getElementById("button1");
var button2 = document.getElementById("button2");
var block1 = document.getElementById("block1");
var block2 = document.getElementById("block2");
var numMessages = document.getElementById("numMessages");
var block1 = document.getElementById("senderName");
var block2 = document.getElementById("messageText");


button1.addEventListener("click",function(e){
	var evenData = {
		from: 'John',
		message: 'Hello'
	};

	trigger("new message",evenData);
});

button2.addEventListener("click",function(e){
	var evenData = {
		from: 'Bill',
		message: 'Make me a sandwitch'
	};

	trigger("new message",evenData);
});

/*block 1 reaction*/
var numOfMwssages = 0;
listen('new-message',function block1reaction(eventData){
	//block1.innerHTML = 'REACTED';
	block1.style.borderColor = "green";
	//console.log(eventData);
	numOfMwssages++;
	numMessages.innerHTML = numOfMwssages;
});

/*block 2 reaction*/
listen('new-message',function block2reaction(msg){
	//block2.innerHTML = JSON.stringify(eventData);
	
	senderName.innerHTML= msg.from;
	messageText.innerHTML= msg.message;
});