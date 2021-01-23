$(document).ready(function () {
    console.log('jQuery sourced.');
    getTask();
});



function getTask(){
    $.ajax({
        type:'GET',
        url:'/todo'
    }).then(function(response){
        console.log(response);
        refreshTasks(response);
    }).catch(function(error){
        console.log('error in GET',error);
    });
}

function refreshTasks(task) {
    $('#taskList').empty();
    for (let i = 0; i < task.length; i++) {
        let tasks = task[i];
        $('#taskList').append(`<tr>
                    <td>${tasks.task}</td>
                    <td>${tasks.published}</td>
                    <td>${tasks.status}</td>
        </tr>`);
    }

}