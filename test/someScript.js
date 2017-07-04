var loggedUser = "";

setInterval(function() {
     Socket.send(JSON.stringify({
        "action": "getChatRooms",
       }));
    // window.scrollTo(0,document.body.scrollHeight);
}, 10000);
var room = [{name: 'Lobby'},{name: 'ddos'},{name: 'Jan-Robin'},{name: 'test'},{name: 'Halp'},{name: 'halp'},{name: 'Numbers are awesome'},{name: 'EscapeTheMatrix'},{name: 'room'}];

angular.module('chatApp', [])
    .controller('ChatListController', function($scope) {
    var roomList = this;
    $scope.selectedRoom;

    roomList.rooms = room;

    roomList.addRoom = function() {
        roomList.rooms.push({name:roomList.roomName, online:false});
        roomList.roomName = '';
    };

    roomList.remaining = function() {
        var count = 0;
        angular.forEach(roomList.rooms, function(room) {
        count += room.online ? 0 : 1;
        });
        return count;
    };

    roomList.archive = function() {
        var oldRooms = roomList.rooms;
        roomList.rooms = [];
        angular.forEach(oldRooms, function(room) {
        if (!room.online) roomList.rooms.push(room);
        });
    };

    $scope.select = function(pRoom) {
        angular.forEach(roomList.rooms, function(room){
            if(room.name==pRoom){
                $scope.selectedRoom = room;
            }
        });
        console.log($scope.selectedRoom);
     
    };

    
});




//Authentication
authentication();
function authentication(){
    var usernames = new Array();
    usernames[0] = "marco";
    usernames[1] = "vic";
    var passwords = new Array();
    passwords[0] = "admin";
    passwords[1] = "admin";
    
    var username = prompt("Please enter your username");
    var password = prompt("Please enter your password");

    if (usernames.indexOf(username) != -1) {
        if (passwords[usernames.indexOf(username)] == password) {
            loggedUser = username;
        }
    } else {
        alert("wrong username or pass");
    }
}

//WebScoket zeug
var Socket = new WebSocket('ws://liebknecht.danielrutz.com:3000/chat');

Socket.onopen = function () {
//   Socket.send('Ping'); // Send the message 'Ping' to the server
};

// Log errors
Socket.onerror = function (error) {
  console.log('WebSocket Error ' + error);
};

// Log messages from the server
Socket.onmessage = function (event) {
    var data = JSON.parse(event.data);
    console.log('Server: ' + event.data);
    if(event.data[0]==="[") {
        room = "[";
        for(var z=0; z<data.length;z++){
            room += "{name: '"+data[z]+"'}";
            if(z<data.length-1){
                room+=",";
            }
        }
        room += "]";
    }else{
        usr = data['user'];
        msg = data['message'];
        time = data['timestamp'];
        roomId = data['roomId'];
        console.log(usr);
        if(loggedUser==usr){
            addMsgOut(msg);
        }else{
            addMsgIn(msg,usr);
        }
        var elem = document.getElementById('main');
    elem.scrollTop = elem.scrollHeight;
    }
};

function test(){console.log(room);}
  
function inputKeyUp(e) {
    e.which = e.which || e.keyCode;
    if(e.which == 13) {
        if(document.getElementById("input").value!=null){
            check();
        }
    }
}

function check(){
    var text = document.getElementById("input").value;
        if(text!=""){
            send();
            document.getElementById("input").value = null;
            //addToArray
            //addMsgOut(text);
        }
    console.log(text);
}

function send(){
    Socket.send(JSON.stringify({
        "action": "postMessage",
        "roomId": "Lobby",
        "user": loggedUser,
        "message": document.getElementById("input").value
            .replace(":/", '<img alt="confused face" class="emoji" src="https://emojipedia-us.s3.amazonaws.com/thumbs/120/apple/96/confused-face_1f615.png">')
            .replace(":)", '<img alt="smiling face" class="emoji" src="https://emojipedia-us.s3.amazonaws.com/thumbs/120/apple/96/slightly-smiling-face_1f642.png">')
            .replace(":(", '<img alt="frowning face" class="emoji" src="https://emojipedia-us.s3.amazonaws.com/thumbs/120/apple/96/slightly-frowning-face_1f641.png">')
            .replace(":D", '<img alt="smiling face with open mouth" class="emoji" src="https://emojipedia-us.s3.amazonaws.com/thumbs/120/apple/96/smiling-face-with-open-mouth_1f603.png">')
    }));
}

function addMsgOut(txt,ts){
    var today = new Date();
    var d = today.getDate();
    var m = today.getMonth() + 1;
    var y = today.getFullYear();
    var h = today.getHours();
    var min = today.getMinutes();
    var dmy = d + "." + m + "." + y;
    var hm = h + ":"+min;
    var date = loggedUser+" - "+hm;

    var element = document.createElement('out');
    var time = document.createElement('outTime');
    var breakIt = document.createElement('br');
	var myMessage = document.createTextNode(txt);
    var myTime = document.createTextNode(date);
	element.appendChild(myMessage);
    time.appendChild(myTime);
	var Ausgabebereich = document.getElementById('main');
    Ausgabebereich.appendChild(time);
	Ausgabebereich.appendChild(element);
    Ausgabebereich.appendChild(breakIt); 
}
function addMsgIn(txt, pUsr){
    var today = new Date();
    var d = today.getDate();
    var m = today.getMonth() + 1;
    var y = today.getFullYear();
    var h = today.getHours();
    var min = today.getMinutes();
    var dmy = d + "." + m + "." + y;
    var hm = h + ":"+min;
    var date = pUsr+" - "+hm;

    var Message = txt.concat("test");
    var element = document.createElement('in');
    var time = document.createElement('inTime');
    var breakIt = document.createElement('br');
	var myMessage = document.createTextNode(txt);
    var myTime = document.createTextNode(date);
	element.appendChild(myMessage);
    time.appendChild(myTime);
	var Ausgabebereich = document.getElementById('main');
    Ausgabebereich.appendChild(time);
	Ausgabebereich.appendChild(element);
    Ausgabebereich.appendChild(breakIt);     
}

function selectChat(){
    var placeholder;
}