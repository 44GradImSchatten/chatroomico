
setInterval(function() {
     Socket.send(JSON.stringify({
        "action": "getChatRooms",
       }));
    // window.scrollTo(0,document.body.scrollHeight);
}, 10000);
var room = [
        {id:0, name:'Room1', messages:[{
            time:'Uhrzeit',text:'asmdasd'},{time:'UHrzeit',text:'akjnjad'}]},
        {id:1, name:'Lobby 2', online:false},
        {id:2, name:'Lobby8', online:true},
        {id:3, name:'ajknjkanjkdadjkn', online:false}];

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
            if(room.id==pRoom){
                $scope.selectedRoom = room;
            }
        });
        console.log($scope.selectedRoom);
     
    };

    
});

var user = "popo";
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
    console.log('Server: ' + data);
    usr = data['user'];
    msg = data['message'];
    time = data['timestamp'];
    roomId = data['roomId'];
    if(user==usr){
        addMsgOut(msg);
    }else{
        addMsgIn(msg);
    }
};
  
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
        "user": this.user,
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
    var date = dmy+" - "+hm;

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
function addMsgIn(txt){
    var today = new Date();
    var d = today.getDate();
    var m = today.getMonth() + 1;
    var y = today.getFullYear();
    var h = today.getHours();
    var min = today.getMinutes();
    var dmy = d + "." + m + "." + y;
    var hm = h + ":"+min;
    var date = dmy+" - "+hm;

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