
var url='http://192.168.1.46:8888';

function sendCommand(commandName){

  $.ajax({
            url      : url+"/moveRobot?op="+commandName,
            data     : "{}",
            cache    : false,
            dataType : "json",
            error    : function(request, error) { // Info Debuggage si erreur
                         console.log("Erreur : responseText: "+request.responseText);
                       },
            success  : function(data) {
                         console.log(data);
                        }
       });

 return false;

}
