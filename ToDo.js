$(document).ready(function(){
var toDos = [];

$("#addToDo").click(function addToDo(){

    var toDoDate = $('#toDoDate').val();
    var toDoAction = $('#toDoAction').val();
    if(toDoDate === ""){
        toDoDate = "No Date";
    }
    var toDo = {"date": toDoDate, "ToDo": toDoAction, "resolved":false};

    toDos.push(toDo);

    updateClean();
});

$(document).on("mouseenter", "tr",function(e){
    console.log($(e.target));
    //$(this).removeClass("hidden");
    //$(".hidden").show();
    $(this).siblings("td button").show();
});
$(document).on("mouseleave", "tr",function(){
    //$(this).addClass("hidden");
    //$(".hidden").hide();
    $(this).siblings("td button").hide();
});

function removeObjectByID(){
    var pos = parseInt($('#objID').val());
    if (isNaN(pos)){
        alert("Error: invalid input");
        return;
    }
    objects.splice(pos, 1);

    updateClean();
}

function updateClean(){
    var txt = "";
    for(var i=0;i<toDos.length;i++){
        txt += "<tr><td>"+(i+1)+"</td><td>"+toDos[i].date+"</td><td>"+toDos[i].ToDo+"</td><td>"+toDos[i].resolved+"</td><td class='hidden'><button type='button'>Resolve</button><br><button type='button'>Remove</button></td></tr>";
    }
    $("#content").html(txt);

}
});