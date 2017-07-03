angular.module('chatApp', [])
    .controller('ChatListController', function($scope) {
    var userList = this;
    $scope.selectedUser;

    userList.users = [
        {id:0, name:'Marco Schlipf', online:true},
        {id:1, name:'Olaf Olson', online:false},
        {id:2, name:'Olaf Olson', online:false},
        {id:3, name:'Victor Veal', online:false}];

    userList.addUser = function() {
        userList.users.push({name:userList.userName, online:false});
        userList.userName = '';
    };

    userList.remaining = function() {
        var count = 0;
        angular.forEach(userList.users, function(user) {
        count += user.online ? 0 : 1;
        });
        return count;
    };

    userList.archive = function() {
        var oldUsers = userList.users;
        userList.users = [];
        angular.forEach(oldUsers, function(user) {
        if (!user.online) userList.users.push(user);
        });
    };

    $scope.select = function(pUser) {
        angular.forEach(userList.users, function(user){
            if(user.id==pUser){
                $scope.selectedUser = user;
            }
        });
        console.log($scope.selectedUser);
     
    };

    
});


  
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
            document.getElementById("input").value = null;
            //send();
            //addToArray
            addMsgOut(text);
        }
    console.log(text);
}

function addMsgOut(txt){
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