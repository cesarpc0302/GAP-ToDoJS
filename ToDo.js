$(document).ready(function(){

var toDos = [];

var add = (function () {
    var counter = 0;
    return function () {return counter += 1;}
})();

$("#addToDo").click(function addToDo(){
    var toDoDate = $('#toDoDate').val();
    var toDoAction = $('#toDoAction').val();
    if(toDoDate === ""){
        toDoDate = "No Date";
    }
    var toDo = {"id":add() ,"date": toDoDate, "ToDo": toDoAction, "resolved":false};

    toDos.push(toDo);

    updateClean();
});

$(document).on("mouseenter", "tr",function(e){
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
    updateClean();

});

$(document).on("click", ".remove", function(){
    var parent = $(this).closest("tr");
    var value = parseInt(parent.find(".ids").text());
    
    var pos = toDos.findIndex(function(obj){
                return obj["id"] === value;
            });

    toDos.splice(pos, 1);
    updateClean();

});

function updateClean(){
    var txt = "";
    for(var i=0;i<toDos.length;i++){
        txt += "<tr><td class='ids'>"+toDos[i].id+"</td><td>"+toDos[i].date+"</td><td>"+toDos[i].ToDo+"</td><td>"+toDos[i].resolved+"</td><td class='hidden'><button type='button' class='resolve'>Set as resolved</button><br><button type='button' class='remove'>Remove To Do</button></td></tr>";
    }
    $("#content").html(txt);

}
});