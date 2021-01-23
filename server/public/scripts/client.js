$(document).ready(function () {
    console.log('jQuery sourced.');
    getTask();
});



function getTask(){
    $.ajax({
        type:'GET',
        url:'/todo'
    }).then(function(response){
        console.log(response)
        refreshTasks(response);
    }).catch(function(error){
        console.log('error in GET',error);
    });
}

function refreshTasks(task) {
    $('#taskList').empty();
    for (let i = 0; i < task.length; i++) {
        let task = task[i];
        $('#taskList').append(`<tr>
                    <td>${task.task}</td>
                    <td>${task.published}</td>
                    <td>${task.status}</td>
        </tr>`);
    }

}