$(document).ready(function(){

var toDos = [];

var add = (function () {
    var counter = 0;
    return function () {return counter += 1;}
})();

$("#addToDo").click(function addToDo(){
    var toDoAction = $('#toDoAction').val();
    if(toDoAction.length === 0 || !toDoAction.trim()){
    	$('#toDoAction').val("This field can not be empty");
    }else{
    	var toDo = {"id":add(), "ToDo": toDoAction, "resolved":false};
    	toDos.push(toDo);
    	updateClean(toDos);
    }
});

$(document).on("mouseenter", "tr",function(){
    $(this).find(".hidden").css("visibility", "visible");
});
$(document).on("mouseleave", "tr",function(){
    $(this).find(".hidden").css("visibility", "hidden");
});

$(document).on("click", ".resolve", function(){
    var parent = $(this).closest("tr");
    var value = parseInt(parent.find(".ids").text());
    var pos = toDos.findIndex(function(obj){
                return obj["id"] === value;
            });

    toDos[pos].resolved = true;
    updateClean(toDos);

});

$(document).on("click", ".remove", function(){
    var parent = $(this).closest("tr");
    var value = parseInt(parent.find(".ids").text());
    
    var pos = toDos.findIndex(function(obj){
                return obj["id"] === value;
            });

    toDos.splice(pos, 1);
    updateClean(toDos);

});

$("#fOptions").change(function() {

    var id = $(this).find("option:selected").attr("id");
    switch (id){
        case "all":
            updateClean(toDos);
            break;
        case "resolved":
            var toDoResolved = toDos.filter(function(obj){
                return obj["resolved"] === true;
            });
            updateClean(toDoResolved);
            $("#fOptions").val("resolved");
            break;
        case "pending":
            var toDoResolved = toDos.filter(function(obj){
                return obj["resolved"] !== true;
            });
            updateClean(toDoResolved);
            $("#fOptions").val("pending");
            break;
        default:
            updateClean(toDos);
  }});

function updateClean(toDoArray){
    var txt = "";
    for(var i=0;i<toDoArray.length;i++){
        txt += "<tr><td class='ids'>"+toDoArray[i].id+"</td><td>"+toDoArray[i].ToDo+"</td><td>"+toDoArray[i].resolved+"</td><td class='hidden'><button type='button' class='resolve'>Set as resolved</button><button type='button' class='remove'>Remove To Do</button></td></tr>";
    }
    $("#content").html(txt);
	$("#toDoAction").val("Enter text here... max 150 characters");
  $("#fOptions").val("All");
}
});
