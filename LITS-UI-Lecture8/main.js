var listeners = [];

var sendMsgBtn = document.getElementById("send-msg-btn");
var msg_body = document.getElementById("msg_body");
var name_sender = document.getElementById("name_sender");

var userList = document.getElementById("user-list");
var msgBodyBlock = document.getElementById("msgBodyBlock");

var messageTemplate = msgBodyBlock.innerHTML;
msgBodyBlock.innerHTML = '';
var MsgDB = [];

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

function updateMsgBody(user){
	if (!MsgDB[user])
		return false;

	msgBodyBlock.innerHTML = "";
	MsgDB[user].forEach(function(e){
		msgBodyBlock.innerHTML += messageTemplate.replace('{{msg}}',e.msg).replace('{{time}}',e.time);
	});
}

sendMsgBtn.addEventListener("click",function(e){
	if (name_sender.value == "" || msg_body.value == ""){
		alert('Name and text of message must be filled!');
		return;
	}
	var eventData = {};
	eventData.from = name_sender.value.trim();
	eventData.message = msg_body.value;
	
	trigger("new message",eventData);
});

userList.addEventListener("click",function(e){
	if (e.target.tagName.toLowerCase() == "li"){
		e.target.classList.remove("msgfrom--item--new");
		updateMsgBody(e.target.innerHTML);
	}
});


listen('new-message',function saveToDB(eventData){	
	var d = new Date();

	if(!MsgDB[eventData.from])
		MsgDB[eventData.from] = [];

	MsgDB[eventData.from].push({
		'time': d.toString(),
		'msg': eventData.message,
	});
});

listen('new-message',function updateFromList(msg){
	userItems = userList.children;

	for (var x in userItems)
		if (userItems.hasOwnProperty(x))
	       if (msg.from == userItems[x].innerText){
	       		userItems[x].classList.add("msgfrom--item--new");
	       		return;
	       }
	el = document.createElement("li");
	userList.appendChild(el);
	el.innerHTML = msg.from;
	el.classList.add("msgfrom--item--new");
});

//listen('new-message',function updateFromList(msg){